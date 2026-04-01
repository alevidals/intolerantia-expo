import { Sparkles } from "@tamagui/lucide-icons-2";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { Button, Text, View, XStack } from "tamagui";
import { AnalyzingMenu } from "@/components/analyzing-menu";
import { ImagePickerButton } from "@/components/image-picker-button";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { TabHeader } from "@/components/tab-header";
import { useAllergyStore } from "@/store/allergies";
import { useHistoryStore } from "@/store/history";
import { useLoadingStore } from "@/store/loading";

export default function HomeTab() {
	const [images, setImages] = useState<string[]>([]);
	const router = useRouter();
	const abortControllerRef = useRef<AbortController | null>(null);

	const allergies = useAllergyStore((state) => state.allergies);
	const isLoading = useLoadingStore((state) => state.isLoading);
	const setIsLoading = useLoadingStore((state) => state.setIsLoading);
	const addScan = useHistoryStore((state) => state.addScan);

	useFocusEffect(
		useCallback(() => {
			return () => {
				setImages([]);
			};
		}, []),
	);

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

	async function scanImages() {
		setIsLoading(true);
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
				Alert.alert("Error", "Failed to analyze menu. Please try again.");
				return;
			}

			// TODO: get schema and type
			const { output: data } = (await response.json()) as {
				output: {
					canEat: string[];
					cannotEat: string[];
					askRestaurant: string[];
					success: boolean;
				};
			};

			if (!data.success) {
				Alert.alert(
					"Analysis Failed",
					"The menu analysis failed. Please ensure the images are clear and try again.",
				);

				setIsLoading(false);
				return;
			}

			addScan({
				images,
				canEat: data.canEat,
				cannotEat: data.cannotEat,
				askRestaurant: data.askRestaurant,
			});

			setIsLoading(false);
			router.push("/history");
		} catch (error) {
			// Check if it was aborted (user cancelled)
			if (error instanceof Error && error.name === "AbortError") {
				// Silently handle cancellation - no need to show error
				return;
			}

			Alert.alert("Error", "Failed to analyze menu. Please try again.");
		} finally {
			abortControllerRef.current = null;
		}
	}

	if (isLoading) {
		return (
			<AnalyzingMenu
				onCancel={() => {
					if (abortControllerRef.current) {
						abortControllerRef.current.abort();
						abortControllerRef.current = null;
					}
					setIsLoading(false);
				}}
			/>
		);
	}

	return (
		<View flex={1}>
			<TabHeader
				title="Eat with confidence"
				description="Scan menus to check for allergens and make informed dining choices"
			/>
			<View px="$4" flex={1} mb="$6">
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
				<MedicalDisclaimer />
			</View>
		</View>
	);
}
