'use strict';

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme} from 'react-native';
import {AppState} from 'react-native';
// Config
import './config/firebase';

// Context
import {AuthProvider, useAuth} from './context/AuthContext';
import {TaskProvider} from './context/TaskContext';
import {ThemeContext} from './context/ThemeContext';
import {NotificationProvider} from './context/NotificationContext';
import {CustomLightTheme, CustomDarkTheme} from './theme';
import {clearSessionTimer} from './utils/sessionTimer';
import {clearStorageOnLaunch} from './utils/secureStorage';

// Routes
import {AppContent} from './routes';

// Components

// Styles defined at the top level
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

const App = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setIsThemeDark(colorScheme === 'dark' ? true : false);
  }, [colorScheme]);

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark],
  );
  let theme = isThemeDark ? CustomDarkTheme : CustomLightTheme;

  // Handle app state changes
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        // App came to foreground
        clearStorageOnLaunch();
      }
    });

    // Clear storage on first launch
    clearStorageOnLaunch();

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AuthProvider>
          <TaskProvider>
            <NotificationProvider>
              <ThemeContext.Provider value={preferences}>
                <PaperProvider theme={theme}>
                  <AppContent />
                </PaperProvider>
              </ThemeContext.Provider>
            </NotificationProvider>
          </TaskProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

// Export at the top level
export default App;
