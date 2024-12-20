import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {FormInput} from '../components/forms/FormInput';
import {Button} from '../components/common/Button';
import {useLogin} from '../hooks/useLogin';

/**
 * LoginScreen component handling user authentication
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {React.Component} LoginScreen component
 */
export default function LoginScreen({navigation}) {
  const theme = useTheme();
  const {email, setEmail, password, setPassword, loading, error, handleLogin} =
    useLogin();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View
        style={[
          styles.formContainer,
          {backgroundColor: theme.colors.surfaceContainerHigh},
        ]}>
        <Text style={[styles.title, {color: theme.colors.primary}]}>Login</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <FormInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <FormInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Login" onPress={handleLogin} loading={loading} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.linkContainer}>
          <Text style={[styles.linkText, {color: theme.colors.primary}]}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
  },
  errorText: {
    color: '#ff3333',
    marginBottom: 16,
    textAlign: 'center',
  },
});
