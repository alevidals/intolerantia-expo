import { useRef } from "react";
import { YStack } from "tamagui";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { ScanForm } from "@/components/scan-form";

export default function HomeTab() {
	const abortControllerRef = useRef<AbortController | null>(null);

	return (
		<YStack px="$4" flex={1} mb="$6" gap="$6">
			<ScanForm abortControllerRef={abortControllerRef} />
			<MedicalDisclaimer />
		</YStack>
	);
}
