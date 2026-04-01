import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ScanHistory = {
	id: number;
	images: string[];
	canEat: string[];
	cannotEat: string[];
	askRestaurant: string[];
};

type HistoryStore = {
	history: ScanHistory[];
	addScan: (scan: Omit<ScanHistory, "id">) => void;
	deleteScan: (id: number) => void;
	clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStore>()(
	persist(
		(set, get) => ({
			history: [],
			addScan: (scan) => {
				const newScan: ScanHistory = {
					...scan,
					id: Date.now(),
				};
				set({ history: [newScan, ...get().history] });
			},
			deleteScan: (id) => {
				set({
					history: get().history.filter((scan) => scan.id !== id),
				});
			},
			clearHistory: () => set({ history: [] }),
		}),
		{
			name: "history-storage",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
