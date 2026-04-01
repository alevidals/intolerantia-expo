import { create } from "zustand";

type AppState = {
	isLoading: boolean;
	isError: boolean;
	setIsLoading: (isLoading: boolean) => void;
	setIsError: (isError: boolean) => void;
	reset: () => void;
};

export const useAppState = create<AppState>()((set) => ({
	isLoading: false,
	isError: false,
	setIsLoading: (isLoading) => set({ isLoading }),
	setIsError: (isError) => set({ isError }),
	reset: () => set({ isLoading: false, isError: false }),
}));
