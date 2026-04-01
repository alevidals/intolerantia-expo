import { Sparkles } from "@tamagui/lucide-icons-2";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { type RefObject, useState } from "react";
import { Alert } from "react-native";
import { Button, Text, View, XStack } from "tamagui";
import { ImagePickerButton } from "@/components/image-picker-button";
import { useAllergyStore } from "@/store/allergies";
import { useHistoryStore } from "@/store/history";
import { useAppState } from "@/store/states";
import type { ScanOutputSchema } from "@/types/scan";

type Props = {
	abortControllerRef: RefObject<AbortController | null>;
};

export function ScanForm({ abortControllerRef }: Props) {
	const [images, setImages] = useState<string[]>([]);
	const setIsLoading = useAppState((state) => state.setIsLoading);
	const setIsError = useAppState((state) => state.setIsError);
	const allergies = useAllergyStore((state) => state.allergies);
	const addScan = useHistoryStore((state) => state.addScan);

	const router = useRouter();

	async function scanImages() {
		setIsLoading(true);
		router.push("/loading");
		abortControllerRef.current = new AbortController();

		try {
			const response = await fetch("/api/scan", {
				headers: {
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({ images, allergies }),
				signal: abortControllerRef.current.signal,
			});

			if (!response.ok) {
				setIsLoading(false);
				setIsError(true);
				router.replace("/error");
				return;
			}

			const data: ScanOutputSchema = await response.json();

			if (!data.success) {
				setIsLoading(false);
				setIsError(true);
				router.replace("/error");
				return;
			}

			addScan({
				images,
				canEat: data.canEat,
				cannotEat: data.cannotEat,
				askRestaurant: data.askRestaurant,
			});

			setIsLoading(false);
			router.replace("/history");
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				return;
			}

			setIsLoading(false);
			setIsError(true);
			router.replace("/error");
		} finally {
			abortControllerRef.current = null;
		}
	}

	async function pickImage() {
		const permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permissionResult.granted) {
			Alert.alert("Permission required");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			base64: true,
			allowsMultipleSelection: false,
			aspect: [16, 9],
			shape: "rectangle",
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			const asset = result.assets[0];

			if (!asset.base64) {
				Alert.alert("Error", "Couldn't read the selected image.");
				return;
			}

			const mimeType = asset.mimeType ?? "image/jpeg";
			const imageDataUrl = `data:${mimeType};base64,${asset.base64}`;

			setImages((prev) => [...prev, imageDataUrl]);
		}
	}

	return (
		<View>
			<XStack gap="$4" mb="$5">
				<ImagePickerButton onPress={pickImage} imageUri={images[0]} />
				<ImagePickerButton onPress={pickImage} imageUri={images[1]} />
				<ImagePickerButton onPress={pickImage} imageUri={images[2]} />
			</XStack>
			<Button
				rounded="$8"
				bg="$blue11"
				height="$6"
				disabled={images.length === 0}
				disabledStyle={{
					opacity: 0.5,
				}}
				pressStyle={{
					bg: "$blue12",
				}}
				onPress={scanImages}
			>
				<Sparkles color="$white" />
				<Text color="$white" fontSize="$4" fontWeight={700}>
					Analyze Menu
				</Text>
			</Button>
		</View>
	);
}
