import { HelpCircle, Trash2, Utensils, XCircle } from "@tamagui/lucide-icons-2";
import { ScrollView, TouchableOpacity } from "react-native";
import {
	Button,
	Card,
	H4,
	Image,
	Separator,
	Text,
	View,
	XStack,
	YStack,
} from "tamagui";
import { TabHeader } from "@/components/tab-header";
import { useHistoryStore } from "@/store/history";

export default function HistoryTab() {
	const { history, deleteScan, clearHistory } = useHistoryStore();

	return (
		<View flex={1}>
			<TabHeader
				title="History"
				description="Your recent menu analysis history"
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
									<Trash2 size={16} color="#ef4444" />
									<Text color="#ef4444">Clear all</Text>
								</Button>
							</XStack>
							{history.map((scan) => (
								<Card key={scan.id} borderWidth={1} borderColor="$gray5">
									<Card.Header>
										<XStack justify="space-between" items="center">
											<Text fontSize="$3" color="$gray11">
												{new Date(scan.id).toLocaleDateString()} at{" "}
												{new Date(scan.id).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit",
												})}
											</Text>
											<TouchableOpacity onPress={() => deleteScan(scan.id)}>
												<Text color="#ef4444" fontSize="$3">
													Delete
												</Text>
											</TouchableOpacity>
										</XStack>
									</Card.Header>
									<Separator />
									{scan.images?.length > 0 && (
										<XStack p="$3" gap="$2">
											{scan.images.slice(0, 3).map((img, idx) => (
												<Image
													key={`${scan.id}-img-${idx}`}
													src={img}
													width={80}
													height={60}
													borderRadius={8}
												/>
											))}
										</XStack>
									)}
									<YStack p="$4" gap="$3">
										{scan.canEat?.length > 0 && (
											<YStack gap="$2">
												<XStack gap="$2" items="center">
													<Utensils size={16} color="#22c55e" />
													<H4 size="$4" color="#22c55e">
														Can eat
													</H4>
												</XStack>
												<Text fontSize="$3">{scan.canEat.join(", ")}</Text>
											</YStack>
										)}
										{scan.cannotEat?.length > 0 && (
											<YStack gap="$2">
												<XStack gap="$2" items="center">
													<XCircle size={16} color="#ef4444" />
													<H4 size="$4" color="#ef4444">
														Cannot eat
													</H4>
												</XStack>
												<Text fontSize="$3">{scan.cannotEat.join(", ")}</Text>
											</YStack>
										)}
										{scan.askRestaurant?.length > 0 && (
											<YStack gap="$2">
												<XStack gap="$2" items="center">
													<HelpCircle size={16} color="#f97316" />
													<H4 size="$4" color="#f97316">
														Ask restaurant
													</H4>
												</XStack>
												<Text fontSize="$3">
													{scan.askRestaurant.join(", ")}
												</Text>
											</YStack>
										)}
									</YStack>
								</Card>
							))}
						</YStack>
					)}
				</View>
			</ScrollView>
		</View>
	);
}
