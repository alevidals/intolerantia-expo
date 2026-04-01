import { useState } from "react";
import { View } from "tamagui";
import { AllergySelector } from "@/components/allergy-selector";
import { SearchInput } from "@/components/search-input";
import { TabHeader } from "@/components/tab-header";
import { ALLERGIES, ALLERGY_LABELS } from "@/constants";
import { useAllergyStore } from "@/store/allergies";

export default function SettingsTab() {
	const setAllergies = useAllergyStore((state) => state.setAllergies);

	const [input, setInput] = useState("");

	const filteredAllergies = ALLERGIES.filter((allergy) =>
		ALLERGY_LABELS[allergy].toLowerCase().includes(input.toLowerCase()),
	);

	return (
		<View flex={1}>
			<TabHeader title="Settings" description="Manage your allergies" />
			<View px="$4" flex={1} mb="$6">
				<SearchInput
					value={input}
					onChangeText={setInput}
					placeholder="Search allergies..."
				/>
				<AllergySelector allergies={filteredAllergies} onSave={setAllergies} />
			</View>
		</View>
	);
}
