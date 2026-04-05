import "@tamagui/native/setup-expo-linear-gradient";

import { Stack } from "expo-router";
import { TamaguiProvider, useTheme } from "tamagui";
import tamaguiConfig from "@/../tamagui.config";
import { Header } from "@/components/header";

function AppContent() {
	const theme = useTheme();

	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: true,
					header: () => <Header />,
					contentStyle: {
						backgroundColor: theme.background.val,
					},
				}}
			/>
			<Stack.Screen
				name="loading"
				options={{
					headerShown: false,
					presentation: "fullScreenModal",
				}}
			/>
			<Stack.Screen
				name="error"
				options={{
					headerShown: false,
					presentation: "fullScreenModal",
				}}
			/>
			<Stack.Screen
				name="history/[id]"
				options={{
					headerShown: false,
					presentation: "modal",
				}}
			/>
		</Stack>
	);
}

export default function RootLayout() {
	return (
		<TamaguiProvider config={tamaguiConfig} defaultTheme="light">
			<AppContent />
		</TamaguiProvider>
	);
}
