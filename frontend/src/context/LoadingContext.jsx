import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useUser } from './UserContext';
import { useTaskContext } from './TaskContext';
import { useListContext } from './ListContext';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const { loading: authLoading } = useAuth();
	const { userData } = useUser();
	const { isLoading: taskLoading, error: taskError } = useTaskContext();
	const { isLoading: listLoading, error: listError } = useListContext();

	useEffect(() => {
		const loadingStates = [
			authLoading,
			!userData,
			taskLoading,
			listLoading,
		];

		// If any context is still loading, keep global loading state true
		setIsLoading(loadingStates.some((state) => state === true));

		// Collect errors from all contexts
		const errors = [taskError, listError].filter(Boolean);
		if (errors.length > 0) {
			setError(errors[0]); // Show the first error
		} else {
			setError(null);
		}
	}, [authLoading, userData, taskLoading, listLoading, taskError, listError]);

	const value = {
		isLoading,
		error,
	};

	return (
		<LoadingContext.Provider value={value}>
			{children}
		</LoadingContext.Provider>
	);
}

export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
};
