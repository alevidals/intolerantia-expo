import { CheckCircle2, ChevronRight } from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Card, type ColorTokens, Image, Text, XStack, YStack } from "tamagui";
import { useHistoryStore } from "@/store/history";
import type { Scan } from "@/types/scan";

type Props = {
	scan: Scan;
	index: number;
};

type BadgeType = "safe" | "avoid" | "ask";

type ScanBadgeProps = {
	count: number;
	type: BadgeType;
};

const BADGE_COLORS: Record<
	BadgeType,
	{
		bg: ColorTokens;
		fg: ColorTokens;
		label: string;
	}
> = {
	safe: { bg: "$green4", fg: "$green11", label: "Safe" },
	avoid: { bg: "$red4", fg: "$red11", label: "Avoid" },
	ask: { bg: "$yellow4", fg: "$yellow11", label: "Ask" },
};

function ScanBadge({ count, type }: ScanBadgeProps) {
	const colors = BADGE_COLORS[type];

	return (
		<XStack
			px="$3"
			py="$2"
			gap="$2"
			items="center"
			justify="center"
			bg={colors.bg}
			rounded="$3"
			borderWidth="$0.75"
			borderColor={colors.fg}
		>
			<CheckCircle2 size={14} color={colors.fg} />
			<Text fontSize="$3" fontWeight="600" color={colors.fg}>
				{count} {colors.label}
			</Text>
		</XStack>
	);
}

export function HistoryCard({ scan, index }: Props) {
	const { deleteScan } = useHistoryStore();
	const router = useRouter();

	function openDetail(id: Scan["id"]) {
		router.push(`/history/${id}`);
	}

	return (
		<TouchableOpacity
			key={scan.id}
			onPress={() => openDetail(scan.id)}
			activeOpacity={0.7}
		>
			<Card bg="#DBE5F4">
				<Card.Header p="$4">
					<XStack justify="space-between" items="center">
						<YStack gap="$1">
							<Text fontSize="$5" fontWeight="700" color="#003D9B">
								Scan #{index + 1}
							</Text>
							<Text fontSize="$3" color="$gray11">
								{new Date(scan.id).toLocaleDateString([], {
									year: "2-digit",
									day: "2-digit",
									month: "2-digit",
								})}{" "}
								at{" "}
								{new Date(scan.id).toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</Text>
						</YStack>
						<XStack gap="$2" items="center">
							<TouchableOpacity
								onPress={(e) => {
									e.stopPropagation();
									deleteScan(scan.id);
								}}
							>
								<Text color="$red11" fontSize="$3">
									Delete
								</Text>
							</TouchableOpacity>
							<ChevronRight size={20} color="$gray9" />
						</XStack>
					</XStack>
				</Card.Header>

				{scan.images?.length > 0 && (
					<XStack px="$4" pb="$3" gap="$2">
						{scan.images.slice(0, 3).map((img) => (
							<Image
								key={`${scan.id}-${img}`}
								src={img}
								width={80}
								height={60}
								borderRadius={8}
							/>
						))}
					</XStack>
				)}

				<XStack p="$4" gap="$2" flexWrap="wrap">
					{scan.canEat.length > 0 && (
						<ScanBadge count={scan.canEat.length} type="safe" />
					)}

					{scan.cannotEat.length > 0 && (
						<ScanBadge count={scan.cannotEat.length} type="avoid" />
					)}

					{scan.askRestaurant.length > 0 && (
						<ScanBadge count={scan.askRestaurant.length} type="ask" />
					)}
				</XStack>
			</Card>
		</TouchableOpacity>
	);
}
