import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Public Screens
import SplashScreen from './screens/SplashScreen';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

// Private Screens (add your authenticated screens here)
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

// Public routes stack
export const PublicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Hides the app bar for all screens
      }}>
      {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

// Private routes stack
export const PrivateStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Add more authenticated screens here */}
    </Stack.Navigator>
  );
};
