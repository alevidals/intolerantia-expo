import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Allergy } from "@/types/allergies";

type AllergyStore = {
	allergies: Allergy[];
	setAllergies: (allergies: Allergy[]) => void;
};

export const useAllergyStore = create<AllergyStore>()(
	persist(
		(set) => ({
			allergies: [],
			setAllergies: (allergies) => set({ allergies }),
		}),
		{
			name: "allergies-storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
