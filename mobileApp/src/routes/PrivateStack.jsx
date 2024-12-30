/**
 * Private navigation stack component
 * @module PrivateStack
 */

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, DrawerActions} from '@react-navigation/native';

// Components
import Header from '../components/header/Header';
import DrawerMain from '../components/drawer/DrawerMain';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import TaskNavigator from './TaskNavigator';
import SettingsScreen from '../screens/SettingsScreen';
// Config & Hooks
import {DRAWER_SCREENS} from '../config/navigationConfig';
import {useDrawerConfig} from '../hooks/useDrawerConfig';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const STACK_SCREENS = {
  MAIN_APP: 'MainApp',
  SETTINGS: 'Settings',
};

/**
 * Renders a drawer icon based on name and color
 * @param {string} name - Icon name
 * @param {string} color - Icon color
 * @param {number} size - Icon size
 * @returns {React.Component} Icon component
 */
const renderDrawerIcon = (name, color, size) => (
  <Icon name={name} color={color} size={size} />
);

/**
 * Drawer Navigator Component
 * Handles main app navigation through drawer
 */
const DrawerNavigator = () => {
  const drawerConfig = useDrawerConfig();

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => null,
        ...drawerConfig,
      }}>
      <Drawer.Screen
        name={DRAWER_SCREENS.DASHBOARD.name}
        options={{
          drawerLabel: DRAWER_SCREENS.DASHBOARD.name,
          drawerLabelStyle: {focused: {color: ''}},
          drawerIcon: ({color, size}) =>
            renderDrawerIcon(DRAWER_SCREENS.DASHBOARD.icon, color, size),
        }}
        component={DashboardScreen}
      />
      <Drawer.Screen
        name={DRAWER_SCREENS.TASKS.name}
        options={{
          drawerLabel: DRAWER_SCREENS.TASKS.name,
          drawerLabelStyle: {focused: {color: ''}},
          drawerIcon: ({color, size}) =>
            renderDrawerIcon(DRAWER_SCREENS.TASKS.icon, color, size),
        }}
        component={TaskNavigator}
      />
    </Drawer.Navigator>
  );
};

/**
 * Private Stack Navigator Component
 * Main navigator that wraps the drawer and other screens
 */
const PrivateStack = () => {
  const navigation = useNavigation();

  const handleDrawerToggle = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({route, options}) => {
          const title = getHeaderTitle(options, route.name);
          return <Header title={title} onMenuPress={handleDrawerToggle} />;
        },
      }}>
      <Stack.Screen
        name={STACK_SCREENS.MAIN_APP}
        component={DrawerNavigator}
        options={{
          title: 'Dashboard',
        }}
      />
      <Stack.Screen
        name={STACK_SCREENS.SETTINGS}
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Stack.Navigator>
  );
};

export default PrivateStack;
