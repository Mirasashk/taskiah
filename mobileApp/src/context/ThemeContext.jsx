import React from 'react';

/**
 * @typedef {Object} ThemeContextType
 * @property {() => void} toggleTheme - Function to toggle between light and dark themes
 * @property {boolean} isThemeDark - Boolean indicating if the current theme is dark
 */

/**
 * Context for managing the application's theme state
 * @type {React.Context<ThemeContextType>}
 */
export const ThemeContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});
