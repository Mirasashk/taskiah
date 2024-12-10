// src/theme/index.js
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import materialTheme from './material-theme.json';

export const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...materialTheme.colors.light,
  },
};

export const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...materialTheme.colors.dark,
  },
};
