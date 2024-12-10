// src/context/ThemeContext.js
import React, {createContext, useState, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {customLightTheme, customDarkTheme} from '../theme';

export const ThemeContext = createContext({
  theme: customLightTheme,
  overrideTheme: null,
  setOverrideTheme: () => {},
});

export const ThemeProvider = ({children}) => {
  const systemColorScheme = useColorScheme();

  const toggleTheme = () => {
    if (overrideTheme === null) {
      setOverrideTheme('light');
    } else if (overrideTheme === 'light') {
      setOverrideTheme('dark');
    } else {
      setOverrideTheme(null);
    }
  };

  // null means follow system, otherwise 'light' or 'dark'
  const [overrideTheme, setOverrideTheme] = useState(null);

  const theme = useMemo(() => {
    if (overrideTheme === 'light') return customLightTheme;
    if (overrideTheme === 'dark') return customDarkTheme;
    return systemColorScheme === 'dark' ? customDarkTheme : customLightTheme;
  }, [overrideTheme, systemColorScheme]);

  const value = {
    theme,
    overrideTheme,
    setOverrideTheme,
    toggleTheme, // add toggleTheme to context value
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
