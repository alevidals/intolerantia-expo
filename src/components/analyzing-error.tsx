import { AlertCircle } from "@tamagui/lucide-icons-2";
import { Button, Text, View, YStack } from "tamagui";

interface AnalyzingErrorProps {
	onRetry?: () => void;
	onCancel?: () => void;
}

export function AnalyzingError({ onRetry, onCancel }: AnalyzingErrorProps) {
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
				bg="$red4"
				rounded={9999}
				mb="$4"
				justify="center"
				items="center"
				borderWidth="$3"
				borderColor="$red10"
				self="center"
			>
				<AlertCircle size={40} color="$red10" />
			</View>
			<View>
				<Text text="center" fontSize="$7" fontWeight={700}>
					Analysis failed
				</Text>
				<Text
					text="center"
					fontSize="$4"
					color="$gray11"
					mt="$2"
					lineHeight="$5"
				>
					We couldn't analyze this menu. Please ensure the images are clear and
					try again.
				</Text>
			</View>
			<View gap="$3" mt="$6" width="100%">
				<Button
					bg="#003D9B"
					rounded="$8"
					pressStyle={{
						bg: "#003D9B",
						opacity: 0.9,
						scale: 0.98,
					}}
					onPress={onRetry}
				>
					<Text color="$white" fontSize="$4" fontWeight={700}>
						Try Again
					</Text>
				</Button>
				<Button
					bg="$gray4"
					rounded="$8"
					pressStyle={{
						bg: "$gray5",
					}}
					onPress={onCancel}
				>
					<Text color="$gray11" fontSize="$4" fontWeight={700}>
						Cancel
					</Text>
				</Button>
			</View>
		</YStack>
	);
}
