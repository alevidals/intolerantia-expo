import { Check, Search } from "@tamagui/lucide-icons-2";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	Button,
	Checkbox,
	getTokens,
	Input,
	ListItem,
	ScrollView,
	Text,
	View,
	XStack,
	YGroup,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";
import { ALLERGIES, ALLERGY_LABELS } from "@/constants";
import { useTodoStore } from "@/store/allergies";

export default function SettingsTab() {
	const allergies = useTodoStore((state) => state.allergies);

	const tokens = getTokens();
	const { top } = useSafeAreaInsets();

	return (
		<View flex={1}>
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
				<Text fontSize="$8" fontWeight={700} mb="$2" color="$white">
					Settings
				</Text>
				<Text color="$white" fontWeight={400}>
					Manage your allergens & preferences
				</Text>
			</View>
			<View px="$4" flex={1} mb="$6">
				<XStack
					bg="$gray4"
					rounded="$8"
					justify="center"
					self="center"
					width="100%"
					height="$6"
					px="$4"
					mb="$6"
				>
					<Search size={22} color="$gray10" self="center" />
					<Input
						flex={1}
						bg="transparent"
						rounded="$0"
						height="100%"
						border="none"
						placeholder="Search allergies..."
					/>
				</XStack>
				<ScrollView flex={1} showsVerticalScrollIndicator={false}>
					<YGroup gap="$3">
						{ALLERGIES.map((allergy) => (
							<ListItem p="$5" bg="white" key={allergy} rounded="$8">
								<Text fontSize="$4" fontWeight="bold">
									{ALLERGY_LABELS[allergy]}
								</Text>
								<Checkbox
									bg="white"
									height="$1.5"
									width="$1.5"
									rounded="$2"
									defaultChecked={allergies.includes(allergy)}
								>
									<Checkbox.Indicator
										bg="$blue11"
										width="$1.5"
										height="$1.5"
										alignItems="center"
										justifyContent="center"
										rounded="$2"
									>
										<Check color="white" strokeWidth={4} />
									</Checkbox.Indicator>
								</Checkbox>
							</ListItem>
						))}
					</YGroup>
				</ScrollView>
				<Button bg="$blue11" size="$6" rounded="$8" mt="$6">
					<Text color="$white" fontSize="$5" fontWeight={600}>
						Save preferences
					</Text>
				</Button>
			</View>
		</View>
	);
}
