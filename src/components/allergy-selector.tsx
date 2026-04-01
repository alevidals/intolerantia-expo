import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Button, Text, View } from "tamagui";
import { AllergyCard } from "@/components/allergy-card";
import { useAllergyStore } from "@/store/allergies";
import type { Allergy } from "@/types/allergies";

type Props = {
	allergies: Allergy[];
	onSave: (allergies: Allergy[]) => void;
};

function keyExtractor(item: Allergy) {
	return item;
}

export function AllergySelector({ allergies, onSave }: Props) {
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
		onSave(formState);
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
				data={allergies}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingBottom: 16,
				}}
			/>
			<Button
				bg="$blue11"
				size="$6"
				rounded="$8"
				mt="$6"
				onPress={handleSave}
				pressStyle={{
					bg: "$blue12",
				}}
			>
				<Text color="$white" fontSize="$5" fontWeight={600}>
					Save preferences
				</Text>
			</Button>
		</View>
	);
}
