/**
 * Private navigation stack component
 * @module PrivateStack
 */

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {getHeaderTitle} from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import Header from '../components/header/Header';
import DrawerMain from '../components/drawer/DrawerMain';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import TaskNavigator from './TaskNavigator';

// Config & Hooks
import {DRAWER_SCREENS} from '../config/navigationConfig';
import {useDrawerConfig} from '../hooks/useDrawerConfig';

const Drawer = createDrawerNavigator();

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
 * Private Stack Navigator Component
 * Handles authenticated user navigation
 * @returns {React.Component} Drawer Navigator
 */
const PrivateStack = () => {
  const drawerConfig = useDrawerConfig();

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerMain {...props} />}
      screenOptions={{
        header: ({navigation, route, options}) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Header
              title={title}
              style={options.headerStyle}
              openDrawer={navigation.openDrawer}
            />
          );
        },
        ...drawerConfig,
      }}>
      <Drawer.Screen
        name={DRAWER_SCREENS.DASHBOARD.name}
        options={{
          drawerLabel: DRAWER_SCREENS.DASHBOARD.name,
          drawerIcon: ({color, size}) =>
            renderDrawerIcon(DRAWER_SCREENS.DASHBOARD.icon, color, size),
        }}
        component={DashboardScreen}
      />
      <Drawer.Screen
        name={DRAWER_SCREENS.TASKS.name}
        options={{
          drawerLabel: DRAWER_SCREENS.TASKS.name,
          drawerIcon: ({color, size}) =>
            renderDrawerIcon(DRAWER_SCREENS.TASKS.icon, color, size),
        }}
        component={TaskNavigator}
      />
    </Drawer.Navigator>
  );
};

export default PrivateStack;
