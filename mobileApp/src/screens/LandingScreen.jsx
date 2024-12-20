// src/screens/LandingScreen.jsx
import React, {useContext} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext';
import ThemeToggle from '../components/ui/ThemeToggle';
import Logo from '../components/ui/Logo';
import HeroSection from '../components/landing/HeroSection';

const LandingScreen = ({navigation}) => {
  const theme = useTheme();
  const {isThemeDark, toggleTheme} = useContext(ThemeContext);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <ThemeToggle isDark={isThemeDark} onToggle={toggleTheme} />
        <Logo isDark={isThemeDark} />
      </View>

      <HeroSection theme={theme} />

      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          style={[styles.button, {backgroundColor: theme.colors.primary}]}
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('Login')}>
          Login
        </Button>
        <Button
          mode="outlined"
          style={[styles.button, {borderColor: theme.colors.primary}]}
          labelStyle={[styles.buttonLabel, {color: theme.colors.primary}]}
          onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 0,
  },
  actionButtons: {
    gap: 16,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 4,
  },
});

export default LandingScreen;
