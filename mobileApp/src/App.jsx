'use strict';

import 'react-native-gesture-handler';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

// Config
import './config/firebase';

// Context
import {ThemeProvider, ThemeContext} from './context/ThemeContext';
import {AuthProvider, useAuth} from './context/AuthContext';
import {TaskProvider} from './context/TaskContext';

// Routes
import {PublicStack, PrivateRoutes} from './routes';

// Components
import {LoadingView} from './components/common/LoadingView';
import {StatusBarWrapper} from './components/common/StatusBarWrapper';

// Styles defined at the top level
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

// Component definitions
const AppContent = () => {
  const {user, loading} = useAuth();
  const {theme} = React.useContext(ThemeContext);

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

const App = () => (
  <GestureHandlerRootView style={styles.root}>
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <ThemeContext.Consumer>
              {({theme}) => (
                <PaperProvider theme={theme}>
                  <AppContent />
                </PaperProvider>
              )}
            </ThemeContext.Consumer>
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

// Export at the top level
export default App;
