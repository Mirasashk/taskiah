/**
 * Custom hook for drawer configuration
 * @module useDrawerConfig
 */

import {useTheme} from 'react-native-paper';
import {DRAWER_STYLES} from '../config/navigationConfig';

/**
 * Hook that returns drawer configuration based on current theme
 * @returns {Object} Drawer screen options configuration
 */
export const useDrawerConfig = () => {
  const theme = useTheme();

  return {
    headerStyle: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    sceneStyle: {
      backgroundColor: theme.colors.surfaceContainerHigh,
    },
    drawerLabelStyle: {
      color: theme.colors.onSurface,
      fontSize: DRAWER_STYLES.fontSize,
      fontFamily: DRAWER_STYLES.fontFamily,
    },
    drawerType: 'slide',
    drawerStyle: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      width: DRAWER_STYLES.width,
    },
    drawerActiveTintColor: theme.colors.primary,
    drawerInactiveTintColor: theme.colors.onSurface,
    drawerItemStyle: {
      backgroundColor: 'transparent',
    },
  };
};
