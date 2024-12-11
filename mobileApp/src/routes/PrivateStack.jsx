import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import DashboardScreen from '../screens/DashboardScreen';

const Drawer = createDrawerNavigator();

const PrivateStack = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => null,
        drawerStyle: {
          backgroundColor: theme.colors.surface,
        },
        drawerActiveTintColor: theme.colors.primary,
      }}>
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: 'Dashboard',
        }}>
        {props => (
          <ScreenWrapper {...props} title="Dashboard">
            <DashboardScreen {...props} />
          </ScreenWrapper>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default PrivateStack;
