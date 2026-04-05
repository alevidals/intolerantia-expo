import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Scan } from "@/types/scan";

type HistoryStore = {
	history: Scan[];
	addScan: (scan: Omit<Scan, "id">) => void;
	deleteScan: (id: number) => void;
	clearHistory: () => void;
};

export const useHistoryStore = create<HistoryStore>()(
	persist(
		(set, get) => ({
			history: [],
			addScan: (scan) => {
				const newScan: Scan = {
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
