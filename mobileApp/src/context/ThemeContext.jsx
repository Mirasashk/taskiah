import React from 'react';
import {useColorScheme} from 'react-native';

export const ThemeContext = React.createContext({
  toggleTheme: () => {},
  isThemeDark: false,
});
