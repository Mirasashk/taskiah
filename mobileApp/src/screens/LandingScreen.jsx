// src/screens/LandingScreen.jsx
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext';

const LandingScreen = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <IconButton
        icon={theme.dark ? 'weather-sunny' : 'weather-night'}
        onPress={toggleTheme}
      />
      <Text>Hello</Text>
    </View>
  );
};

export default LandingScreen;
