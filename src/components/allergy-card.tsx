import { type ReactNode, useState } from "react";
import { ListItem, Text, View, YStack } from "tamagui";
import { ALLERGY_LABELS } from "@/constants";
import type { Allergy } from "@/types/allergies";

type Props = {
	allergy: Allergy;
	isSelected: boolean;
	onToggle: (allergy: Allergy) => void;
};

const ALLERGY_ICONS: Record<Allergy, ReactNode> = {
	CELERY: "🥬",
	CRUSTACEANS: "🦐",
	EGGS: "🥚",
	FISH: "🐟",
	COW_PROTEIN: "🥛",
	DAIRY: "🧀",
	GLUTEN: "🌾",
	LUPINS: "🌰",
	MUSTARD: "🌭",
	PEANUTS: "🥜",
	LACTOSE: "🥛",
	MOLLUSKS: "🐚",
	SESAME_SEEDS: "🌿",
	SOY: "🌱",
	TREE_NUTS: "🌰",
};

export function AllergyCard({ allergy, isSelected, onToggle }: Props) {
	const [isPressed, setIsPressed] = useState(false);

	function toggleAllergy() {
		onToggle(allergy);
	}

	function togglePressState() {
		setIsPressed((prev) => !prev);
	}

	const textColor = isSelected || isPressed ? "#003D9B" : "$black";

	return (
		<View p="$2">
			<ListItem
				p="$3"
				rounded="$8"
				borderColor={isSelected ? "#003D9B" : "white"}
				borderWidth="$0.75"
				bg={isSelected ? "#DBE5F4" : "$white"}
				pressStyle={{
					borderColor: "#003D9B",
					bg: "#DBE5F4",
					scale: 0.98,
				}}
				onPress={toggleAllergy}
				onPressIn={togglePressState}
				onPressOut={togglePressState}
			>
				<YStack gap="$2">
					<Text fontSize={24}>{ALLERGY_ICONS[allergy]}</Text>
					<Text fontSize="$4" fontWeight="bold" color={textColor}>
						{ALLERGY_LABELS[allergy]}
					</Text>
				</YStack>
			</ListItem>
		</View>
	);
}
