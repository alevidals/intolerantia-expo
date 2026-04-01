import { ListItem, Text, View } from "tamagui";
import { ALLERGY_LABELS } from "@/constants";
import type { Allergy } from "@/types/allergies";

type Props = {
	allergy: Allergy;
	isSelected: boolean;
	onToggle: (allergy: Allergy) => void;
};

export function AllergyCard({ allergy, isSelected, onToggle }: Props) {
	const handlePress = () => {
		onToggle(allergy);
	};

	return (
		<View p="$2">
			<ListItem
				py="$5"
				px="$4"
				rounded="$8"
				borderColor={isSelected ? "$blue11" : "white"}
				borderWidth={2}
				bg={isSelected ? "$blue3" : "$white"}
				pressStyle={{
					borderColor: "$blue11",
					bg: "$blue6",
				}}
				onPress={handlePress}
			>
				<Text fontSize="$4" fontWeight="bold">
					{ALLERGY_LABELS[allergy]}
				</Text>
			</ListItem>
		</View>
	);
}
