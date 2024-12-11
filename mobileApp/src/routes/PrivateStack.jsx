import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeScreen from '../screens/HomeScreen';

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
        name="Home"
        options={{
          drawerLabel: 'Home',
        }}>
        {props => (
          <ScreenWrapper {...props} title="Home">
            <HomeScreen {...props} />
          </ScreenWrapper>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default PrivateStack;
