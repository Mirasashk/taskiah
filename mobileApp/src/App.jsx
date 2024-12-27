'use strict';

import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useColorScheme} from 'react-native';
// Config
import './config/firebase';

// Context
import {AuthProvider, useAuth} from './context/AuthContext';
import {TaskProvider} from './context/TaskContext';
import {ThemeContext} from './context/ThemeContext';
import {CustomLightTheme, CustomDarkTheme} from './theme';

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

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AuthProvider>
          <TaskProvider>
            <ThemeContext.Provider value={preferences}>
              <PaperProvider theme={theme}>
                <AppContent />
              </PaperProvider>
            </ThemeContext.Provider>
          </TaskProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

// Export at the top level
export default App;
