import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		// Create a MediaQueryList object
		const mediaQuery = window.matchMedia(query);

		// Set the initial value
		setMatches(mediaQuery.matches);

		// Create an event listener
		const handler = (event) => setMatches(event.matches);

		// Add the listener to handle changes
		mediaQuery.addEventListener('change', handler);

		// Clean up
		return () => mediaQuery.removeEventListener('change', handler);
	}, [query]);

	return matches;
};
