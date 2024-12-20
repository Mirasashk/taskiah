/**
 * Navigation configuration constants
 * @module navigationConfig
 */

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

/**
 * Configuration for public screens (screens accessible without authentication)
 * @type {Array<{name: string, component: React.ComponentType}>}
 */
export const publicScreens = [
  {
    name: 'Landing',
    component: LandingScreen,
  },
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Signup',
    component: SignupScreen,
  },
];

export const DRAWER_SCREENS = {
  DASHBOARD: {
    name: 'Dashboard',
    icon: 'home',
  },
  TASKS: {
    name: 'Tasks',
    icon: 'clipboard-edit-outline',
  },
};

export const DRAWER_STYLES = {
  width: '60%',
  fontFamily: 'Georgia',
  fontSize: 16,
};
