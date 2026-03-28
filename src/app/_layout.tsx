import "@tamagui/native/setup-expo-linear-gradient";

import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "@/../tamagui.config";

export default function RootLayout() {
	return (
		<TamaguiProvider config={tamaguiConfig} defaultTheme="light">
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			</Stack>
		</TamaguiProvider>
	);
}
