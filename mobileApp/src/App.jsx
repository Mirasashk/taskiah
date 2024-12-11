import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View, ActivityIndicator} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Import firebase config first
import './config/firebase';

import {ThemeProvider, ThemeContext} from './context/ThemeContext';
import {AuthProvider, useAuth} from './context/AuthContext';
import {PublicStack, PrivateRoutes} from './routes';

const AppContent = () => {
  const {user, loading} = useAuth();
  const {theme} = useContext(ThemeContext);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer theme={theme}>
        {user ? <PrivateRoutes /> : <PublicStack />}
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <ThemeContext.Consumer>
              {({theme}) => (
                <PaperProvider theme={theme}>
                  <AppContent />
                </PaperProvider>
              )}
            </ThemeContext.Consumer>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
