import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import { Text, YStack } from "tamagui";

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
	label: string;
};

export function TabItem({ onPress, focused, icon, label }: Props) {
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
				bg={focused ? "$blue3" : "transparent"}
				gap="$1"
				scale={focused ? 1.05 : 1}
			>
				{icon}

				<Text fontSize="$2" color={focused ? "$blue9" : "$gray10"}>
					{label}
				</Text>
			</YStack>
		</YStack>
	);
}
