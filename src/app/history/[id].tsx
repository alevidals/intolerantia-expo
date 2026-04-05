import { FlashList } from "@shopify/flash-list";
import { X } from "@tamagui/lucide-icons-2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Text, View, XStack, YStack } from "tamagui";
import { HistoryDetailCard } from "@/components/history-detail-card";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { useHistoryStore } from "@/store/history";

type DetailListItem =
	| {
			type: "section";
			title: string;
			count: number;
			tone: "safe" | "avoid" | "ask";
	  }
	| { type: "item"; key: string; item: string; tone: "safe" | "avoid" | "ask" }
	| { type: "disclaimer" };

const SECTION_STYLES = {
	safe: {
		dot: "$green10",
		text: "$green11",
		badgeBg: "$green4",
	},
	avoid: {
		dot: "$red10",
		text: "$red11",
		badgeBg: "$red4",
	},
	ask: {
		dot: "$yellow10",
		text: "$yellow11",
		badgeBg: "$yellow4",
	},
} as const;

export default function HistoryDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const { history } = useHistoryStore();

	const scan = history.find((s) => s.id === Number(id));

	if (!scan) {
		return (
			<View flex={1} justify="center" items="center">
				<Text>Scan not found</Text>
			</View>
		);
	}

	const scanDate = new Date(scan.id);
	const totalItems =
		scan.canEat.length + scan.cannotEat.length + scan.askRestaurant.length;

	const listData: DetailListItem[] = [
		...(scan.canEat.length > 0
			? [
					{
						type: "section" as const,
						title: "Safe to Eat",
						count: scan.canEat.length,
						tone: "safe" as const,
					},
					...scan.canEat.map((item) => ({
						type: "item" as const,
						key: `safe-${item}`,
						item,
						tone: "safe" as const,
					})),
				]
			: []),
		...(scan.cannotEat.length > 0
			? [
					{
						type: "section" as const,
						title: "Not Recommended",
						count: scan.cannotEat.length,
						tone: "avoid" as const,
					},
					...scan.cannotEat.map((item) => ({
						type: "item" as const,
						key: `danger-${item}`,
						item,
						tone: "avoid" as const,
					})),
				]
			: []),
		...(scan.askRestaurant.length > 0
			? [
					{
						type: "section" as const,
						title: "Consult Staff",
						count: scan.askRestaurant.length,
						tone: "ask" as const,
					},
					...scan.askRestaurant.map((item) => ({
						type: "item" as const,
						key: `caution-${item}`,
						item,
						tone: "ask" as const,
					})),
				]
			: []),
		{ type: "disclaimer" },
	];

	return (
		<View flex={1} bg="$white">
			<XStack
				p="$4"
				justify="space-between"
				items="center"
				borderColor="$gray5"
			>
				<YStack gap="$1">
					<Text fontSize="$6" fontWeight="700" color="#003D9B">
						Scan Details
					</Text>
					<Text fontSize="$3" color="$gray11">
						{scanDate.toLocaleDateString([], {
							year: "2-digit",
							month: "2-digit",
							day: "2-digit",
						})}{" "}
						· {totalItems} dishes
					</Text>
				</YStack>
				<TouchableOpacity onPress={() => router.back()}>
					<XStack
						width={32}
						height={32}
						bg="$gray4"
						rounded="$10"
						items="center"
						justify="center"
					>
						<X size={18} color="$gray11" />
					</XStack>
				</TouchableOpacity>
			</XStack>

			<FlashList
				data={listData}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => {
					if (item.type === "section") return `section-${item.title}`;
					if (item.type === "disclaimer") return "disclaimer";
					return item.key;
				}}
				renderItem={({ item }) => {
					if (item.type === "section") {
						const styles = SECTION_STYLES[item.tone];

						return (
							<XStack gap="$2" items="center" mt="$5" mb="$3">
								<View width={10} height={10} bg={styles.dot} rounded={5} />
								<Text fontSize="$5" fontWeight="700" color={styles.text}>
									{item.title}
								</Text>
								<XStack bg={styles.badgeBg} px="$2" py="$1" rounded="$2">
									<Text fontSize="$2" fontWeight="700" color={styles.text}>
										{item.count}
									</Text>
								</XStack>
							</XStack>
						);
					}

					if (item.type === "disclaimer") {
						return (
							<View mt="$5">
								<MedicalDisclaimer />
							</View>
						);
					}

					return (
						<View mb="$2">
							<HistoryDetailCard item={item.item} type={item.tone} />
						</View>
					);
				}}
				contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
			/>
		</View>
	);
}
