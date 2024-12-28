import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import SignupForm from '../components/signup/SignupForm';

/**
 * SignupScreen component that handles user registration
 * @returns {React.ReactElement} SignupScreen component
 */
export const SignupScreen = () => {
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'start',
    paddingHorizontal: 40,
    paddingTop: 100,
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
