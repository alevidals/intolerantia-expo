import { ImagePlus } from "@tamagui/lucide-icons-2";
import type { GestureResponderEvent } from "react-native";
import { Button, getTokens, Image } from "tamagui";

type Props = {
	onPress: (event: GestureResponderEvent) => void;
	imageUri?: string;
};

export function ImagePickerButton({ onPress, imageUri }: Props) {
	const tokens = getTokens();

	return (
		<Button
			flex={1}
			borderStyle="dashed"
			bg="$blue4"
			borderWidth="$1"
			borderColor="$blue10"
			height="$9"
			p="$2"
			onPress={onPress}
			pressStyle={{
				bg: "$blue6",
				borderWidth: "$1",
				borderColor: "$blue10",
				borderStyle: "dashed",
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
				<ImagePlus color="$blue10" size="$2.5" />
			)}
		</Button>
	);
}
