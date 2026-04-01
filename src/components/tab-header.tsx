import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTokens, Text, View } from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

type Props = {
	title: string;
	description: string;
};

export function TabHeader({ title, description }: Props) {
	const { top } = useSafeAreaInsets();

	const tokens = getTokens();

	return (
		<View
			px="$4"
			pt={tokens.size.$3.val + top}
			pb="$5"
			position="relative"
			mb="$6"
		>
			<LinearGradient
				colors={["$blue12", "$blue10", "$blue7"]}
				start={[0, 0]}
				end={[0, 1]}
				inset={0}
				position="absolute"
				borderBottomLeftRadius="$8"
				borderBottomRightRadius="$8"
			/>
			<Text fontSize="$8" fontWeight={800} mb="$2" color="$white">
				{title}
			</Text>
			<Text color="$white" fontWeight={400} fontSize="$3">
				{description}
			</Text>
		</View>
	);
}
