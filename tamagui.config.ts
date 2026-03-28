import { createAnimations } from "@tamagui/animations-react-native";
import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui";

export const tamaguiConfig = createTamagui({
	...defaultConfig,
	animations: createAnimations({
		bouncy: {
			damping: 10,
			mass: 0.9,
			stiffness: 100,
		},
		lazy: {
			damping: 18,
			stiffness: 50,
		},
		quick: {
			damping: 20,
			mass: 1.2,
			stiffness: 250,
		},
	}),
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
	interface TamaguiCustomConfig extends Conf {}
}
