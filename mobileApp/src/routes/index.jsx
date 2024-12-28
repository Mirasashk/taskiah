import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';

// Components
import {LoadingView} from '../components/common/LoadingView';
import {StatusBarWrapper} from '../components/layout/StatusBarWrapper';

// Configs
import {publicScreens} from '../config/navigationConfig';
import {getDefaultScreenOptions} from '../theme/navigationTheme';

// Hooks
import {useAuth} from '../context/AuthContext';

// Routes
import PrivateStack from './PrivateStack';

const Stack = createNativeStackNavigator();

/**
 * Main application content component that handles authentication state
 * and renders appropriate navigation stack
 * @returns {React.ReactElement}
 */
export const AppContent = () => {
  const theme = useTheme();
  const {user, loading} = useAuth();

  if (loading) {
    return <LoadingView />;
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

/**
 * Public navigation stack for unauthenticated users
 * @returns {React.ReactElement}
 */
export const PublicStack = () => {
  const theme = useTheme();
  const screenOptions = getDefaultScreenOptions(theme);

  // Add default screens if publicScreens is undefined
  const screens = publicScreens || [
    {
      name: 'Landing',
      component: LandingScreen,
    },
  ];

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {screens.map(({name, component}) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

/**
 * Private navigation stack for authenticated users
 * @returns {React.ReactElement}
 */
export const PrivateRoutes = () => <PrivateStack />;
