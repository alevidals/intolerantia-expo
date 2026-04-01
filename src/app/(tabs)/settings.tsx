import { Search } from "@tamagui/lucide-icons-2";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
	Button,
	Input,
	ListItem,
	ScrollView,
	Text,
	View,
	XStack,
} from "tamagui";
import { TabHeader } from "@/components/tab-header";
import { ALLERGIES, ALLERGY_LABELS } from "@/constants";
import { useAllergyStore } from "@/store/allergies";
import type { Allergy } from "@/types/allergies";

export default function SettingsTab() {
	const allergies = useAllergyStore((state) => state.allergies);
	const setAllergies = useAllergyStore((state) => state.setAllergies);

	const [input, setInput] = useState("");
	const [formState, setFormState] = useState(allergies);

	const filteredAllergies = ALLERGIES.filter((allergy) =>
		ALLERGY_LABELS[allergy].toLowerCase().includes(input.toLowerCase()),
	);

	useFocusEffect(
		useCallback(() => {
			setFormState(allergies);
		}, [allergies]),
	);

	function toggleAllergy(allergy: Allergy) {
		setFormState((prev) =>
			prev.includes(allergy)
				? prev.filter((a) => a !== allergy)
				: [...prev, allergy],
		);
	}

	function savePreferences() {
		setAllergies(formState);
	}

	return (
		<View flex={1}>
			<TabHeader title="Settings" description="Manage your allergies" />
			<View px="$4" flex={1} mb="$6">
				<XStack
					bg="$gray5"
					rounded="$8"
					justify="center"
					self="center"
					width="100%"
					height="$6"
					px="$4"
					mb="$6"
				>
					<Search size={22} color="$gray11" self="center" />
					<Input
						flex={1}
						bg="transparent"
						rounded="$0"
						height="100%"
						border="none"
						placeholder="Search allergies..."
						placeholderTextColor="$gray10"
						value={input}
						onChangeText={setInput}
					/>
				</XStack>
				<ScrollView flex={1} showsVerticalScrollIndicator={false}>
					<XStack flexWrap="wrap" gap="$3">
						{filteredAllergies.map((allergy) => (
							<ListItem
								width="48%"
								p="$5"
								key={allergy}
								rounded="$8"
								borderColor={formState.includes(allergy) ? "$blue11" : "white"}
								borderWidth={2}
								bg={formState.includes(allergy) ? "$blue3" : "$white"}
								pressStyle={{
									borderColor: "$blue11",
									bg: "$blue6",
								}}
								onPress={() => toggleAllergy(allergy)}
							>
								<Text fontSize="$4" fontWeight="bold">
									{ALLERGY_LABELS[allergy]}
								</Text>
							</ListItem>
						))}
					</XStack>
				</ScrollView>
				<Button
					bg="$blue11"
					size="$6"
					rounded="$8"
					mt="$6"
					onPress={savePreferences}
					pressStyle={{
						bg: "$blue12",
					}}
				>
					<Text color="$white" fontSize="$5" fontWeight={600}>
						Save preferences
					</Text>
				</Button>
			</View>
		</View>
	);
}
