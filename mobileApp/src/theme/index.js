// src/theme/index.js
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

import materialTheme from './material-theme.json';

// Change the export names to match usage in App.jsx
export const CustomLightTheme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,
    ...materialTheme.colors.light,
  },
  palettes: {
    ...materialTheme.palettes.light,
  },
};

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...materialTheme.colors.dark,
  },
  palettes: {
    ...materialTheme.palettes.dark,
  },
};
