import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { YStack } from "tamagui";

type Props = {
	onPress:
		| (((
				e:
					| GestureResponderEvent
					| React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		  ) => void) &
				((
					e:
						| React.MouseEvent<HTMLAnchorElement, MouseEvent>
						| GestureResponderEvent,
				) => void))
		| undefined;
	focused: boolean;
	icon: ReactNode;
};

export function TabItem({ onPress, focused, icon }: Props) {
	return (
		<YStack
			flex={1}
			self="center"
			onPress={onPress}
			pressStyle={{ opacity: 0.7 }}
		>
			<YStack
				justify="center"
				p="$2.5"
				rounded="$8"
				bg={focused ? "#DBE5F4" : "transparent"}
				gap="$1"
				scale={focused ? 1.05 : 1}
			>
				{icon}
			</YStack>
		</YStack>
	);
}
