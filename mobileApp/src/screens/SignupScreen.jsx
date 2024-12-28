import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import SignupForm from '../components/signup/SignupForm';

/**
 * SignupScreen component that handles user registration
 * @returns {React.ReactElement} SignupScreen component
 */
export const SignupScreen = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[styles.title, {color: theme.colors.primary}]}
        variant="displaySmall">
        Sign Up
      </Text>
      <Text style={styles.subtitle} variant="bodyLarge">
        Create an account to get started
      </Text>
      <SignupForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SignupScreen;
