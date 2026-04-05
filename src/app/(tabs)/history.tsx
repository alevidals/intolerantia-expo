import { FlashList } from "@shopify/flash-list";
import { Trash2 } from "@tamagui/lucide-icons-2";
import { Button, Text, View, XStack } from "tamagui";
import { HistoryCard } from "@/components/history-card";
import { useHistoryStore } from "@/store/history";

type ScanHistory = {
	id: number;
	images: string[];
	canEat: string[];
	cannotEat: string[];
	askRestaurant: string[];
};

type GroupedScans = {
	[key: string]: ScanHistory[];
};

type HistoryListItem =
	| { type: "section"; title: string }
	| { type: "scan"; scan: ScanHistory; index: number };

function getDateCategory(date: Date): string {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const scanDate = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
	);

	if (scanDate.getTime() === today.getTime()) {
		return "Today";
	}
	if (scanDate.getTime() === yesterday.getTime()) {
		return "Yesterday";
	}

	const daysDiff = Math.floor(
		(today.getTime() - scanDate.getTime()) / (1000 * 60 * 60 * 24),
	);

	if (daysDiff <= 7) {
		return "Last 7 days";
	}
	if (daysDiff <= 30) {
		return "Last 30 days";
	}

	return "Older";
}

function groupScansByDate(scans: ScanHistory[]): GroupedScans {
	const grouped: GroupedScans = {};

	scans.forEach((scan) => {
		const category = getDateCategory(new Date(scan.id));
		if (!grouped[category]) {
			grouped[category] = [];
		}
		grouped[category].push(scan);
	});

	return grouped;
}

export default function HistoryTab() {
	const { history, clearHistory } = useHistoryStore();

	const groupedScans = groupScansByDate(history);

	const categories = [
		"Today",
		"Yesterday",
		"Last 7 days",
		"Last 30 days",
		"Older",
	];

	const listData = categories.flatMap<HistoryListItem>((category) => {
		const scans = groupedScans[category];

		if (!scans || scans.length === 0) {
			return [];
		}

		return [
			{ type: "section", title: category },
			...scans.map((scan, index) => ({ type: "scan" as const, scan, index })),
		];
	});

	if (!history || history.length === 0) {
		return (
			<View px="$4" flex={1} mb="$6">
				<Text color="#003D9B" fontSize="$4">
					No scans yet. Start analyzing menus!
				</Text>
			</View>
		);
	}

	return (
		<View px="$4" flex={1} mb="$6">
			<FlashList
				data={listData}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) =>
					item.type === "section" ? `section-${item.title}` : `${item.scan.id}`
				}
				renderItem={({ item }) => {
					if (item.type === "section") {
						return (
							<Text
								fontSize="$4"
								fontWeight="600"
								color="#003D9B"
								mt="$4"
								mb="$3"
							>
								{item.title}
							</Text>
						);
					}

					return (
						<View mb="$3">
							<HistoryCard scan={item.scan} index={item.index} />
						</View>
					);
				}}
				ListHeaderComponent={
					<XStack justify="flex-end" mb="$1">
						<Button size="$3" chromeless onPress={clearHistory}>
							<Trash2 size={16} color="$red11" />
							<Text color="$red11">Clear all</Text>
						</Button>
					</XStack>
				}
				contentContainerStyle={{ paddingBottom: 16 }}
			/>
		</View>
	);
}
