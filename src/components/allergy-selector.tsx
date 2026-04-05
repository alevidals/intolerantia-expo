import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Text, View } from "tamagui";
import { AllergyCard } from "@/components/allergy-card";
import { ALLERGIES } from "@/constants";
import { useAllergyStore } from "@/store/allergies";
import type { Allergy } from "@/types/allergies";

function keyExtractor(item: Allergy) {
	return item;
}

export function AllergySelector() {
	const setAllergies = useAllergyStore((state) => state.setAllergies);
	const savedAllergies = useAllergyStore((state) => state.allergies);
	const [formState, setFormState] = useState(savedAllergies);

	useFocusEffect(
		useCallback(() => {
			setFormState(savedAllergies);
		}, [savedAllergies]),
	);

	function toggleAllergy(allergy: Allergy) {
		setFormState((prev) =>
			prev.includes(allergy)
				? prev.filter((a) => a !== allergy)
				: [...prev, allergy],
		);
	}

	function handleSave() {
		setAllergies(formState);
	}

	function renderItem({ item }: { item: Allergy }) {
		return (
			<AllergyCard
				allergy={item}
				isSelected={formState.includes(item)}
				onToggle={toggleAllergy}
			/>
		);
	}

	return (
		<View flex={1}>
			<FlashList
				data={ALLERGIES}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 16,
				}}
			/>
			<Button
				bg="#003D9B"
				size="$6"
				rounded={9999}
				mt="$8"
				onPress={handleSave}
				pressStyle={{
					scale: 0.98,
					bg: "#003D9B",
					opacity: 0.9,
				}}
			>
				<Text color="$white" fontSize="$5" fontWeight={600}>
					Save preferences
				</Text>
			</Button>
		</View>
	);
}
