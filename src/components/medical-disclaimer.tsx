import { Text, View } from "tamagui";

export function MedicalDisclaimer() {
	return (
		<View
			bg="#DBE5F4"
			borderLeftWidth="$1.5"
			borderLeftColor="#003D9B"
			p="$4"
			rounded="$8"
		>
			<Text fontWeight={700} color="#003D9B" mb="$1">
				Medical disclaimer
			</Text>
			<Text color="black">
				This is a quick view; always consult with restaurant staff before
				consuming. AI result may vary based on photo quality
			</Text>
		</View>
	);
}
