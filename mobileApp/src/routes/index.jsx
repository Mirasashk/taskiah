import React, {useEffect, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeContext} from '../context/ThemeContext';

import {View} from 'react-native';
// Import your screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PrivateStack from './PrivateStack';
import LandingScreen from '../screens/LandingScreen';

const Stack = createNativeStackNavigator();

export const PublicStack = () => {
	const {theme} = useContext(ThemeContext);

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
