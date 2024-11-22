import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useUser } from './UserContext';

const ThemeContext = createContext(null);
const THEME_KEY = 'theme_preference';

export function ThemeProvider({ children }) {
    const { userData } = useUser();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // First check localStorage
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
            return savedTheme === 'dark';
        }

        // Then check user preferences from backend
        if (userData?.extraInfo?.preferences?.theme) {
            return userData.extraInfo.preferences.theme === 'dark';
        }

        // Finally, check system preference
        return window.matchMedia('(prefers-color-scheme: dark)')
            .matches;
    });

    useEffect(() => {
        // Update theme when user data changes
        if (userData?.extraInfo?.preferences?.theme) {
            setIsDarkMode(
                userData.extraInfo.preferences.theme === 'dark'
            );
        }
    }, [userData]);

    useEffect(() => {
        // Apply theme to document and save to localStorage
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem(THEME_KEY, 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem(THEME_KEY, 'light');
        }
    }, [isDarkMode]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        const handleChange = (e) => {
            // Only update if no user preference is saved
            if (!localStorage.getItem(THEME_KEY)) {
                setIsDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () =>
            mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(
            'useTheme must be used within a ThemeProvider'
        );
    }
    return context;
};
