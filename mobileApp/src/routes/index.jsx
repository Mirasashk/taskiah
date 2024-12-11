import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Import your screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PrivateStack from './PrivateStack';

const Stack = createNativeStackNavigator();

export const PublicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export const PrivateRoutes = () => {
  return <PrivateStack />;
};
