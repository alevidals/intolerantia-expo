import { Search } from "@tamagui/lucide-icons-2";
import { Input, XStack } from "tamagui";

type Props = {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
};

export function SearchInput({
	value,
	onChangeText,
	placeholder = "Search...",
}: Props) {
	return (
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
				placeholder={placeholder}
				placeholderTextColor="$gray10"
				value={value}
				onChangeText={onChangeText}
			/>
		</XStack>
	);
}
