import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useUser } from './UserContext';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const { userData, clearUserData } = useUser();
    const [isDarkMode, setIsDarkMode] = useState(
        userData?.extraInfo?.preferences?.theme === 'dark'
            ? true
            : false
    );

    useEffect(() => {
        if (userData?.extraInfo?.preferences?.theme) {
            setIsDarkMode(
                userData?.extraInfo?.preferences?.theme === 'dark'
                    ? true
                    : false
            );
        }
    }, []);

    useEffect(() => {
        console.log(userData);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

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
