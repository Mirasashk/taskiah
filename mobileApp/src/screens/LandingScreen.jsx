// src/screens/LandingScreen.jsx
import React, {useContext, useEffect} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext';

const LandingScreen = ({navigation}) => {
  const {theme, toggleTheme, overrideTheme} = useContext(ThemeContext);

  useEffect(() => {
    console.log(theme.colors.primary);
  }, [theme]);

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      contentContainerStyle={styles.contentContainer}>
      {/* Header with Logo and Theme Toggle */}
      <View style={styles.header}>
        <View style={styles.themeToggleContainer}>
          <IconButton
            icon={theme.dark ? 'weather-sunny' : 'weather-night'}
            iconColor={theme.colors.background}
            size={24}
            onPress={toggleTheme}
            style={[
              styles.themeToggle,
              {backgroundColor: theme.colors.onBackground},
            ]}
          />
        </View>
        {/* Placeholder for your app logo */}
        <View style={styles.logoContainer}>
          <Image
            source={
              theme.dark
                ? require('../assets/images/Logo_white.png')
                : require('../assets/images/Logo_black.png')
            }
            style={styles.logoImage}
          />
        </View>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        {/* Placeholder for hero graphic */}
        <View style={styles.heroGraphicPlaceholder}>
          <Image
            source={require('../assets/images/heroImg.png')}
            style={styles.heroGraphic}
          />
        </View>

        {/* Hero Text */}
        <Text style={[styles.heroTitle, {color: theme.colors.onBackground}]}>
          Organize Your Tasks
        </Text>
        <Text style={[styles.heroSubtitle, {color: theme.colors.onBackground}]}>
          Stay productive and manage your tasks efficiently with Taskiah
        </Text>
      </View>

      {/* Action Buttons */}
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
    paddingHorizontal: 30,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 0,
  },
  themeToggleContainer: {
    alignSelf: 'flex-end',
    padding: 0,
    margin: 0,
  },
  logoContainer: {
    flex: 0,
    paddingBottom: 20,
  },
  logoImage: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  themeToggle: {
    marginLeft: 'auto',
  },
  heroSection: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  heroGraphicPlaceholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  heroGraphic: {
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  actionButtons: {
    gap: 16,
    paddingBottom: 40,
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
