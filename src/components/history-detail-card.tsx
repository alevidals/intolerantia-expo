import { BadgeCheck, OctagonX, TriangleAlert } from "@tamagui/lucide-icons-2";
import { Card, type ColorTokens, Text, View, XStack, YStack } from "tamagui";

type HistoryDetailCardType = "safe" | "avoid" | "ask";

type Props = {
	item: string;
	type: HistoryDetailCardType;
};

type DetailCardConfig = {
	bg: ColorTokens;
	fg: ColorTokens;
	Icon: typeof BadgeCheck;
};

const DETAIL_CARD_CONFIG: Record<HistoryDetailCardType, DetailCardConfig> = {
	safe: {
		bg: "$green4",
		fg: "$green10",
		Icon: BadgeCheck,
	},
	avoid: {
		bg: "$red4",
		fg: "$red10",
		Icon: OctagonX,
	},
	ask: {
		bg: "$yellow4",
		fg: "$yellow11",
		Icon: TriangleAlert,
	},
};

export function HistoryDetailCard({ item, type }: Props) {
	const { bg, fg, Icon } = DETAIL_CARD_CONFIG[type];

	return (
		<Card rounded="$4">
			<XStack p="$3" gap="$3" items="center">
				<View
					width={40}
					height={40}
					bg={bg}
					rounded="$3"
					items="center"
					justify="center"
				>
					<Icon size={18} color={fg} />
				</View>
				<YStack flex={1} gap="$1">
					<Text fontSize="$4" fontWeight="600" color="$gray12">
						{item}
					</Text>
				</YStack>
			</XStack>
		</Card>
	);
}
