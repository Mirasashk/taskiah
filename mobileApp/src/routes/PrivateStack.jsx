import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import NotificationsScreen from '../screens/NotificationsScreen';
// ... other screen imports

const Drawer = createDrawerNavigator();

const PrivateStack = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        header: () => null, // Hide the default header
        drawerStyle: {
          backgroundColor: theme.colors.surface,
        },
        drawerActiveTintColor: theme.colors.primary,
      }}>
      <Drawer.Screen
        name="Home"
        component={props => (
          <ScreenWrapper {...props} title="Home">
            <HomeScreen {...props} />
          </ScreenWrapper>
        )}
      />
      {/* <Drawer.Screen
        name="Settings"
        component={props => (
          <ScreenWrapper {...props} title="Settings">
            <SettingsScreen {...props} />
          </ScreenWrapper>
        )}
      />
      <Drawer.Screen
        name="Notifications"
        component={props => (
          <ScreenWrapper {...props} title="Notifications">
            <NotificationsScreen {...props} />
          </ScreenWrapper>
        )}
      /> */}
      {/* Add other screens as needed */}
    </Drawer.Navigator>
  );
};

export default PrivateStack;
