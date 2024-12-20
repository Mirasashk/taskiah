import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import SignupForm from '../components/signup/SignupForm';

/**
 * SignupScreen component that handles user registration
 * @returns {React.ReactElement} SignupScreen component
 */
export const SignupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create an account to get started</Text>
      <SignupForm />
    </View>
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
