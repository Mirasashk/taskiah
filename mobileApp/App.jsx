// App.jsx
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';
import {PublicStack, PrivateStack} from './src/routes';

const AppContent = () => {
  const isAuthenticated = false; // example

  return (
    <ThemeContext.Consumer>
      {({theme}) => (
        <>
          <StatusBar
            backgroundColor={theme.colors.background}
            barStyle={theme.dark ? 'light-content' : 'dark-content'}
          />
          <NavigationContainer theme={theme}>
            {isAuthenticated ? <PrivateStack /> : <PublicStack />}
          </NavigationContainer>
        </>
      )}
    </ThemeContext.Consumer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({theme}) => (
          <PaperProvider theme={theme}>
            <AppContent />
          </PaperProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}
