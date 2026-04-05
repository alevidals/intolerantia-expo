import { Text, View } from "tamagui";
import { AllergySelector } from "@/components/allergy-selector";

export default function SettingsTab() {
	return (
		<View px="$4" flex={1} mb="$6">
			<Text lineHeight="$4" mb="$6" fontSize={16} color="#003D9B">
				Select your dietary restrictions to personalize your AI scanning
				experience. These settings will be applied to all future ingredient
				checks.
			</Text>
			<AllergySelector />
		</View>
	);
}
