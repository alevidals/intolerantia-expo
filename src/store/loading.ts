import { create } from "zustand";

type LoadingStore = {
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
};

export const useLoadingStore = create<LoadingStore>()((set) => ({
	isLoading: false,
	setIsLoading: (isLoading) => set({ isLoading }),
}));
