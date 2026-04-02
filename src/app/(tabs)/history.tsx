import {
	AlertCircle,
	CheckCircle2,
	ChevronRight,
	Trash2,
	XCircle,
} from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native";
import {
	Button,
	Card,
	Image,
	Separator,
	Text,
	View,
	XStack,
	YStack,
} from "tamagui";
import { TabHeader } from "@/components/tab-header";
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
	const router = useRouter();
	const { history, deleteScan, clearHistory } = useHistoryStore();

	const totalDishes = history.reduce(
		(acc, scan) =>
			acc +
			scan.canEat.length +
			scan.cannotEat.length +
			scan.askRestaurant.length,
		0,
	);

	const groupedScans = groupScansByDate(history);
	const categories = [
		"Today",
		"Yesterday",
		"Last 7 days",
		"Last 30 days",
		"Older",
	];

	const openDetail = (scan: ScanHistory) => {
		router.push(`/history/${scan.id}`);
	};

	return (
		<View flex={1}>
			<TabHeader
				title="Scan History"
				description={`${history.length} scans · ${totalDishes} dishes analyzed`}
			/>
			<ScrollView>
				<View px="$4" pb="$6">
					{history.length === 0 ? (
						<View py="$10" items="center">
							<Text color="$gray11" fontSize="$4">
								No scans yet. Start analyzing menus!
							</Text>
						</View>
					) : (
						<YStack gap="$4">
							<XStack justify="flex-end">
								<Button size="$3" chromeless onPress={clearHistory}>
									<Trash2 size={16} color="$red11" />
									<Text color="$red11">Clear all</Text>
								</Button>
							</XStack>

							{categories.map((category) => {
								const scans = groupedScans[category];
								if (!scans || scans.length === 0) return null;

								return (
									<YStack key={category} gap="$3">
										<Text fontSize="$4" fontWeight="600" color="$gray10">
											{category}
										</Text>

										<YStack gap="$3">
											{scans.map((scan) => (
												<TouchableOpacity
													key={scan.id}
													onPress={() => openDetail(scan)}
												>
													<Card
														borderWidth={1}
														borderColor="$gray5"
														elevation={2}
													>
														<Card.Header p="$4">
															<XStack justify="space-between" items="center">
																<YStack gap="$1">
																	<Text
																		fontSize="$5"
																		fontWeight="700"
																		color="$gray12"
																	>
																		Scan #{scan.id.toString().slice(-4)}
																	</Text>
																	<Text fontSize="$3" color="$gray11">
																		{new Date(scan.id).toLocaleDateString()} at{" "}
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

														<Separator />

														<XStack p="$4" gap="$2" flexWrap="wrap">
															{scan.canEat.length > 0 && (
																<XStack
																	px="$3"
																	py="$2"
																	gap="$1"
																	flex={1}
																	items="center"
																	justify="center"
																	bg="$green4"
																	rounded="$3"
																>
																	<CheckCircle2 size={14} color="$green11" />
																	<Text
																		fontSize="$3"
																		fontWeight="600"
																		color="$green11"
																	>
																		{scan.canEat.length} Safe
																	</Text>
																</XStack>
															)}

															{scan.cannotEat.length > 0 && (
																<XStack
																	px="$3"
																	py="$2"
																	gap="$1"
																	flex={1}
																	items="center"
																	justify="center"
																	bg="$red4"
																	rounded="$3"
																>
																	<XCircle size={14} color="$red11" />
																	<Text
																		fontSize="$3"
																		fontWeight="600"
																		color="$red11"
																	>
																		{scan.cannotEat.length} Avoid
																	</Text>
																</XStack>
															)}

															{scan.askRestaurant.length > 0 && (
																<XStack
																	px="$3"
																	py="$2"
																	gap="$1"
																	flex={1}
																	items="center"
																	justify="center"
																	bg="$yellow4"
																	rounded="$3"
																>
																	<AlertCircle size={14} color="$yellow11" />
																	<Text
																		fontSize="$3"
																		fontWeight="600"
																		color="$yellow11"
																	>
																		{scan.askRestaurant.length} Ask
																	</Text>
																</XStack>
															)}
														</XStack>
													</Card>
												</TouchableOpacity>
											))}
										</YStack>
									</YStack>
								);
							})}
						</YStack>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
