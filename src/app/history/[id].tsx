import {
	CircleCheck,
	CircleX,
	Info,
	TriangleAlert,
	X,
} from "@tamagui/lucide-icons-2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Card, ScrollView, Text, View, XStack, YStack } from "tamagui";
import { useHistoryStore } from "@/store/history";

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

	return (
		<View flex={1} bg="$white">
			{/* Header */}
			<XStack
				p="$4"
				justify="space-between"
				items="center"
				borderBottomWidth={1}
				borderColor="$gray5"
			>
				<YStack gap="$1">
					<Text fontSize="$6" fontWeight="700" color="$gray12">
						Scan Details
					</Text>
					<Text fontSize="$3" color="$gray11">
						{scanDate.toLocaleDateString()} · {totalItems} dishes
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

			{/* Content */}
			<ScrollView flex={1}>
				<View p="$4">
					<YStack gap="$5">
						{/* Safe Section */}
						{scan.canEat.length > 0 && (
							<YStack gap="$3">
								<XStack gap="$2" items="center">
									<View width={10} height={10} bg="$green10" rounded={5} />
									<Text fontSize="$5" fontWeight="700" color="$green11">
										Safe to Eat
									</Text>
									<XStack bg="$green4" px="$2" py="$1" rounded="$2">
										<Text fontSize="$2" fontWeight="700" color="$green11">
											{scan.canEat.length}
										</Text>
									</XStack>
								</XStack>
								<YStack gap="$2">
									{scan.canEat.map((item) => (
										<Card
											key={`safe-${item}`}
											borderWidth={1}
											borderColor="$green6"
											elevation={1}
											bg="$white"
											rounded="$4"
										>
											<XStack p="$3" gap="$3" items="center">
												<XStack
													width={40}
													height={40}
													bg="$green4"
													rounded="$3"
													items="center"
													justify="center"
												>
													<Text fontSize="$5">🍽️</Text>
												</XStack>
												<YStack flex={1} gap="$1">
													<Text fontSize="$4" fontWeight="600" color="$gray12">
														{item}
													</Text>
												</YStack>
												<CircleCheck size={20} color="$green10" />
											</XStack>
										</Card>
									))}
								</YStack>
							</YStack>
						)}

						{/* Danger Section */}
						{scan.cannotEat.length > 0 && (
							<YStack gap="$3">
								<XStack gap="$2" items="center">
									<View width={10} height={10} bg="$red10" rounded={5} />
									<Text fontSize="$5" fontWeight="700" color="$red11">
										Not Recommended
									</Text>
									<XStack bg="$red4" px="$2" py="$1" rounded="$2">
										<Text fontSize="$2" fontWeight="700" color="$red11">
											{scan.cannotEat.length}
										</Text>
									</XStack>
								</XStack>
								<YStack gap="$2">
									{scan.cannotEat.map((item) => (
										<Card
											key={`danger-${item}`}
											borderWidth={1}
											borderColor="$red6"
											elevation={1}
											bg="$white"
											rounded="$4"
										>
											<XStack p="$3" gap="$3" items="center">
												<XStack
													width={40}
													height={40}
													bg="$red4"
													rounded="$3"
													items="center"
													justify="center"
												>
													<Text fontSize="$5">⚠️</Text>
												</XStack>
												<YStack flex={1} gap="$1">
													<Text fontSize="$4" fontWeight="600" color="$gray12">
														{item}
													</Text>
												</YStack>
												<CircleX size={20} color="$red10" />
											</XStack>
										</Card>
									))}
								</YStack>
							</YStack>
						)}

						{/* Caution Section */}
						{scan.askRestaurant.length > 0 && (
							<YStack gap="$3">
								<XStack gap="$2" items="center">
									<View width={10} height={10} bg="$yellow10" rounded={5} />
									<Text fontSize="$5" fontWeight="700" color="$yellow11">
										Consult Staff
									</Text>
									<XStack bg="$yellow4" px="$2" py="$1" rounded="$2">
										<Text fontSize="$2" fontWeight="700" color="$yellow11">
											{scan.askRestaurant.length}
										</Text>
									</XStack>
								</XStack>
								<YStack gap="$2">
									{scan.askRestaurant.map((item) => (
										<Card
											key={`caution-${item}`}
											borderWidth={1}
											borderColor="$yellow6"
											elevation={1}
											bg="$white"
											rounded="$4"
										>
											<XStack p="$3" gap="$3" items="center">
												<XStack
													width={40}
													height={40}
													bg="$yellow4"
													rounded="$3"
													items="center"
													justify="center"
												>
													<Text fontSize="$5">❓</Text>
												</XStack>
												<YStack flex={1} gap="$1">
													<Text fontSize="$4" fontWeight="600" color="$gray12">
														{item}
													</Text>
												</YStack>
												<TriangleAlert size={20} color="$yellow10" />
											</XStack>
										</Card>
									))}
								</YStack>
							</YStack>
						)}

						{/* Disclaimer */}
						<XStack bg="$blue4" rounded="$4" p="$3" gap="$2" items="center">
							<Info size={18} color="$blue10" />
							<Text fontSize="$3" color="$blue11" flex={1}>
								Always confirm ingredients with restaurant staff before
								ordering.
							</Text>
						</XStack>
					</YStack>
				</View>
			</ScrollView>
		</View>
	);
}
