import { Sparkles } from "@tamagui/lucide-icons-2";
import { Button, Text, View, YStack } from "tamagui";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";

interface AnalyzingMenuProps {
	onCancel?: () => void;
}

export function AnalyzingMenu({ onCancel }: AnalyzingMenuProps) {
	return (
		<YStack
			px="$4"
			flex={1}
			justify="center"
			items="center"
			bg="$white"
			gap="$6"
		>
			<View
				height="$12"
				width="$12"
				bg="#DBE5F4"
				rounded={9999}
				mb="$4"
				justify="center"
				items="center"
				borderWidth="$3"
				borderColor="#003D9B"
				self="center"
			>
				<Sparkles size={40} color="#003D9B" />
			</View>
			<View>
				<Text text="center" fontSize="$7" fontWeight={700}>
					Analyzing the menu...
				</Text>
				<Text
					text="center"
					fontSize="$4"
					color="$gray11"
					mt="$2"
					lineHeight="$5"
				>
					This may take a moment. Please wait while we check for allergens and
					dietary information.
				</Text>
			</View>
			<MedicalDisclaimer />
			<Button
				bg="#003D9B"
				rounded="$8"
				pressStyle={{
					bg: "#003D9B",
					opacity: 0.9,
					scale: 0.98,
				}}
				onPress={onCancel}
			>
				<Text color="$white" fontSize="$4" fontWeight={700}>
					Cancel
				</Text>
			</Button>
		</YStack>
	);
}
