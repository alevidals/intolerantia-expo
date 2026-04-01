import { Text, View } from "tamagui";

export function MedicalDisclaimer() {
	return (
		<View
			mt="$5"
			bg="$blue4"
			borderLeftWidth="$1.5"
			borderLeftColor="$blue11"
			p="$4"
			rounded="$8"
		>
			<Text fontWeight={700}>Medical disclaimer</Text>
			<Text>
				This is a recommendation; always consult with restaurant staff before
				consuming. AI result may vary based on photo quality
			</Text>
		</View>
	);
}
