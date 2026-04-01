import { History, ScanText, Settings2 } from "@tamagui/lucide-icons-2";
import { Tabs, usePathname } from "expo-router";
import { getTokens } from "tamagui";
import { TabItem } from "@/components/tab-item";

export default function TabsLayout() {
	const pathname = usePathname();

	const tokens = getTokens();
	const borderRadius10 = tokens.radius.$10.val;

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					margin: 0,
					borderTopStartRadius: borderRadius10,
					borderTopEndRadius: borderRadius10,
					paddingTop: 10,
					backgroundColor: "white",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarButton: ({ onPress }) => {
						const focused = pathname === "/";

						return (
							<TabItem
								focused={focused}
								onPress={onPress}
								icon={
									<ScanText
										color={focused ? "$blue9" : "$gray10"}
										self="center"
									/>
								}
								label="Scanner"
							/>
						);
					},
				}}
			/>

			<Tabs.Screen
				name="history"
				options={{
					title: "History",
					tabBarButton: ({ onPress }) => {
						const focused = pathname === "/history";

						return (
							<TabItem
								focused={focused}
								onPress={onPress}
								icon={
									<History
										color={focused ? "$blue9" : "$gray10"}
										self="center"
									/>
								}
								label="History"
							/>
						);
					},
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarButton: ({ onPress }) => {
						const focused = pathname === "/settings";

						return (
							<TabItem
								focused={focused}
								onPress={onPress}
								icon={
									<Settings2
										color={focused ? "$blue9" : "$gray10"}
										self="center"
									/>
								}
								label="Settings"
							/>
						);
					},
				}}
			/>
		</Tabs>
	);
}
