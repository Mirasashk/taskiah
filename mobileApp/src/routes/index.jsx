import React, {useEffect, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider, useAuth} from '../context/AuthContext';
import {useTheme} from 'react-native-paper';

import {View} from 'react-native';

// Components
import {LoadingView} from '../components/common/LoadingView';
import {StatusBarWrapper} from '../components/layout/StatusBarWrapper';

// Import your screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PrivateStack from './PrivateStack';
import LandingScreen from '../screens/LandingScreen';

const Stack = createNativeStackNavigator();

// Component definitions
export const AppContent = () => {
  const theme = useTheme();
  const {user, loading} = useAuth();

  if (loading) {
    return <LoadingView theme={theme} />;
  }

  return (
    <>
      <StatusBarWrapper theme={theme} />
      <NavigationContainer theme={theme}>
        {user ? <PrivateRoutes /> : <PublicStack />}
      </NavigationContainer>
    </>
  );
};

export const PublicStack = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.surfaceContainerHigh,
        },
      }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export const PrivateRoutes = () => {
  return <PrivateStack />;
};
