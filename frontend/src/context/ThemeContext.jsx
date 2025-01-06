import { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { userService } from '../services/userApi';

const ThemeContext = createContext(null);
const THEME_KEY = 'theme_preference';

const defaultTheme = {
	mode: 'light',
	fontFamily: 'system-ui',
	fontSize: 'medium',
};

export function ThemeProvider({ children }) {
	const { userData } = useUser();
	const [theme, setTheme] = useState(() => {
		try {
			// First check localStorage
			const savedTheme = localStorage.getItem(THEME_KEY);
			if (savedTheme) {
				const parsedTheme = JSON.parse(savedTheme);
				// Validate the parsed theme has the required properties
				if (typeof parsedTheme === 'object' && parsedTheme !== null) {
					return {
						...defaultTheme,
						...parsedTheme,
					};
				}
			}

			// Then check user preferences from backend
			if (userData?.extraInfo?.preferences?.theme) {
				return {
					...defaultTheme,
					...userData.extraInfo.preferences.theme,
				};
			}
		} catch (error) {
			console.error('Error parsing theme:', error);
			localStorage.removeItem(THEME_KEY); // Clear invalid data
		}

		// Finally, use system preferences for dark mode
		return {
			...defaultTheme,
			mode: window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light',
		};
	});

	useEffect(() => {
		// Update theme when user data changes
		if (userData?.extraInfo?.preferences?.theme) {
			setTheme((prev) => ({
				...prev,
				...userData.extraInfo.preferences.theme,
			}));
		}
	}, [userData]);

	useEffect(() => {
		try {
			// Apply theme to document and save to localStorage
			const root = document.documentElement;

			// Apply dark mode
			if (theme.mode === 'dark') {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}

			// Apply font family
			root.style.setProperty('--font-family', theme.fontFamily);

			// Apply font size variables
			const fontSizes = {
				small: {
					xs: '0.75rem',
					sm: '0.875rem',
					base: '1rem',
					lg: '1.125rem',
					xl: '1.25rem',
				},
				medium: {
					xs: '0.875rem',
					sm: '1rem',
					base: '1.125rem',
					lg: '1.25rem',
					xl: '1.5rem',
				},
				large: {
					xs: '1rem',
					sm: '1.125rem',
					base: '1.25rem',
					lg: '1.5rem',
					xl: '1.75rem',
				},
			};

			const sizes = fontSizes[theme.fontSize] || fontSizes.medium;
			Object.entries(sizes).forEach(([key, value]) => {
				root.style.setProperty(`--font-size-${key}`, value);
			});

			// Save to localStorage
			localStorage.setItem(THEME_KEY, JSON.stringify(theme));
		} catch (error) {
			console.error('Error applying theme:', error);
		}
	}, [theme]);

	// Listen for system theme changes
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e) => {
			// Only update if no user preference is saved
			if (!localStorage.getItem(THEME_KEY)) {
				setTheme((prev) => ({
					...prev,
					mode: e.matches ? 'dark' : 'light',
				}));
			}
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	const updateTheme = (updates) => {
		setTheme((prev) => ({ ...prev, ...updates }));
	};

	return (
		<ThemeContext.Provider value={{ theme, updateTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
