import { useRef } from "react";
import { View } from "tamagui";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { ScanForm } from "@/components/scan-form";
import { TabHeader } from "@/components/tab-header";

export default function HomeTab() {
	const abortControllerRef = useRef<AbortController | null>(null);

	return (
		<View flex={1}>
			<TabHeader
				title="Eat with confidence"
				description="Scan menus to check for allergens and make informed dining choices"
			/>
			<View px="$4" flex={1} mb="$6">
				<ScanForm abortControllerRef={abortControllerRef} />
				<MedicalDisclaimer />
			</View>
		</View>
	);
}
