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
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo isDark={isThemeDark} />
      </View>
      <HeroSection theme={theme} />

      <View style={styles.actionButtons}>
        <Button
          mode="contained"
          style={styles.button}
          buttonColor={theme.colors.primary}
          labelStyle={{color: theme.colors.onPrimary}}
          onPress={() => navigation.navigate('Login')}>
          Log in
        </Button>
        <Button
          mode="outlined"
          style={[styles.button, {borderColor: theme.colors.primary}]}
          labelStyle={[styles.buttonLabel, {color: theme.colors.primary}]}
          onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
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
    borderRadius: 25,
    width: '85%',
    marginHorizontal: 'auto',
    paddingVertical: 8,
  },
});

export default LandingScreen;
