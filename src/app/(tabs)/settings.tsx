import { Check, Search } from "@tamagui/lucide-icons-2";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
	Button,
	Checkbox,
	Input,
	ListItem,
	ScrollView,
	Text,
	View,
	XStack,
	YGroup,
} from "tamagui";
import { TabHeader } from "@/components/tab-header";
import { ALLERGIES, ALLERGY_LABELS } from "@/constants";
import { useTodoStore } from "@/store/allergies";
import type { Allergy } from "@/types/allergies";

export default function SettingsTab() {
	const allergies = useTodoStore((state) => state.allergies);
	const setAllergies = useTodoStore((state) => state.setAllergies);

	const [input, setInput] = useState("");
	const [formState, setFormState] = useState(allergies);

	const filteredAllergies = ALLERGIES.filter((allergy) =>
		ALLERGY_LABELS[allergy].toLowerCase().includes(input.toLowerCase()),
	);

	useFocusEffect(
		useCallback(() => {
			setFormState(allergies);
		}, [allergies]),
	);

	function toggleAllergy(allergy: Allergy) {
		setFormState((prev) =>
			prev.includes(allergy)
				? prev.filter((a) => a !== allergy)
				: [...prev, allergy],
		);
	}

	function savePreferences() {
		setAllergies(formState);
	}

	return (
		<View flex={1}>
			<TabHeader title="Settings" description="Manage your allergies" />
			<View px="$4" flex={1} mb="$6">
				<XStack
					bg="$gray5"
					rounded="$8"
					justify="center"
					self="center"
					width="100%"
					height="$6"
					px="$4"
					mb="$6"
				>
					<Search size={22} color="$gray11" self="center" />
					<Input
						flex={1}
						bg="transparent"
						rounded="$0"
						height="100%"
						border="none"
						placeholder="Search allergies..."
						placeholderTextColor="$gray10"
						value={input}
						onChangeText={setInput}
					/>
				</XStack>
				<ScrollView flex={1} showsVerticalScrollIndicator={false}>
					<YGroup gap="$3">
						{filteredAllergies.map((allergy) => (
							<ListItem
								p="$5"
								bg="white"
								key={allergy}
								rounded="$8"
								borderColor={formState.includes(allergy) ? "$blue11" : "white"}
								borderWidth={2}
								onPress={() => toggleAllergy(allergy)}
							>
								<Text fontSize="$4" fontWeight="bold">
									{ALLERGY_LABELS[allergy]}
								</Text>
								<Checkbox
									bg="white"
									height="$1.5"
									width="$1.5"
									rounded="$2"
									checked={formState.includes(allergy)}
									onCheckedChange={() => toggleAllergy(allergy)}
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
				<Button
					bg="$blue11"
					size="$6"
					rounded="$8"
					mt="$6"
					onPress={savePreferences}
				>
					<Text color="$white" fontSize="$5" fontWeight={600}>
						Save preferences
					</Text>
				</Button>
			</View>
		</View>
	);
}
