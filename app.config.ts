import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	name: "intolerantIA-expo",
	scheme: "intolerantIA-expo",
	slug: "intolerantIA-expo",
	plugins: ["expo-router"],
	version: "1.0.0",
	orientation: "portrait",
	userInterfaceStyle: "light",
	experiments: {
		typedRoutes: true,
	},
	web: {
		output: "server",
	},
});
