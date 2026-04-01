import { Sparkles } from "@tamagui/lucide-icons-2";
import { Button, Text, View } from "tamagui";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

interface AnalyzingMenuProps {
	onCancel?: () => void;
}

export function AnalyzingMenu({ onCancel }: AnalyzingMenuProps) {
	return (
		<View px="$4" flex={1} justify="center" items="center" bg="$white">
			<View
				height="$12"
				width="$12"
				bg="$blue11"
				rounded={9999}
				mb="$4"
				justify="center"
				items="center"
				borderWidth="$3"
				borderColor="$blue4"
				self="center"
			>
				<Sparkles size={40} color="$white" />
			</View>
			<Text text="center" fontSize="$7" fontWeight={700} mt="$4">
				Analyzing the menu...
			</Text>
			<Text text="center" fontSize="$4" color="$gray11" mt="$2" lineHeight="$5">
				This may take a moment. Please wait while we check for allergens and
				dietary information.
			</Text>
			<MedicalDisclaimer />
			<Button
				mt="$4"
				bg="$blue11"
				rounded="$8"
				pressStyle={{
					bg: "$blue12",
				}}
				onPress={onCancel}
			>
				<Text color="$white" fontSize="$4" fontWeight={700}>
					Cancel
				</Text>
			</Button>
		</View>
	);
}
