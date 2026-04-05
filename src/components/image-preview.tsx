import { Image as ImageIcon } from "@tamagui/lucide-icons-2";
import type { GestureResponderEvent } from "react-native";
import { Button, getTokens, Image } from "tamagui";

type Props = {
	onPress: (event: GestureResponderEvent) => void;
	imageUri?: string;
};

export function ImagePreview({ onPress, imageUri }: Props) {
	const tokens = getTokens();

	return (
		<Button
			flex={1}
			borderStyle="dashed"
			bg="#DBE5F4"
			borderWidth="$1"
			borderColor="#003D9B"
			height="$9"
			p="$2"
			disabled={!imageUri}
			disabledStyle={{
				opacity: 0.5,
			}}
			onPress={onPress}
			pressStyle={{
				scale: 0.98,
				bg: "#DBE5F4",
				opacity: 0.9,
				borderColor: "#003D9B",
			}}
		>
			{imageUri ? (
				<Image
					src={imageUri}
					width="100%"
					height="100%"
					borderRadius={tokens.size["$0.75"].val}
				/>
			) : (
				<ImageIcon color="#003D9B" size="$2" />
			)}
		</Button>
	);
}
