// App.jsx
import React, {useContext} from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, View, ActivityIndicator} from 'react-native';

// Import firebase config first
import './src/config/firebase';

import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';
import {AuthProvider, useAuth} from './src/context/AuthContext';
import {PublicStack, PrivateStack} from './src/routes';

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
        {user ? <PrivateStack /> : <PublicStack />}
      </NavigationContainer>
    </>
  );
};

export default function App() {
  return (
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
  );
}
