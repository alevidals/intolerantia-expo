import { useRouter } from "expo-router";
import { useEffect } from "react";
import { AnalyzingError } from "@/components/analyzing-error";
import { useAppState } from "@/store/states";

export default function ErrorScreen() {
	const router = useRouter();
	const setIsError = useAppState((state) => state.setIsError);

	useEffect(() => {
		// Si no hay error, volver atrás
		const isError = useAppState.getState().isError;
		if (!isError) {
			router.back();
		}
	}, [router]);

	const handleRetry = () => {
		setIsError(false);
		router.back();
	};

	const handleCancel = () => {
		setIsError(false);
		router.back();
	};

	return <AnalyzingError onRetry={handleRetry} onCancel={handleCancel} />;
}
