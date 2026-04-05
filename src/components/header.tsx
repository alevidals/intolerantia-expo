import { ScanFace } from "@tamagui/lucide-icons-2";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, XStack } from "tamagui";

export function Header() {
	const insets = useSafeAreaInsets();

	return (
		<XStack
			pt={insets.top}
			px="$4"
			bg="white"
			items="center"
			gap="$2"
			pb="$3"
			elevation="$0.5"
			mb="$6"
		>
			<ScanFace size={32} color="#003D9B" />
			<Text fontSize="$5" fontWeight={600} color="#003D9B">
				IntolerantIA
			</Text>
		</XStack>
	);
}
