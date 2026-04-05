import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AnalyzingMenu } from "@/components/analyzing-menu";
import { useAppState } from "@/store/states";

export default function LoadingScreen() {
	const router = useRouter();
	const abortControllerRef = useRef<AbortController | null>(null);
	const setIsLoading = useAppState((state) => state.setIsLoading);

	useEffect(() => {
		const isLoading = useAppState.getState().isLoading;
		if (!isLoading) {
			router.back();
		}
	}, [router]);

	const handleCancel = () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
			abortControllerRef.current = null;
		}
		setIsLoading(false);
		router.back();
	};

	return <AnalyzingMenu onCancel={handleCancel} />;
}
