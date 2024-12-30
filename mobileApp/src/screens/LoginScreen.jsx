import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useTheme, Button, Text, Checkbox} from 'react-native-paper';
import {FormInput} from '../components/forms/FormInput';

import {useLogin} from '../hooks/useLogin';
import {useBiometric} from '../hooks/useBiometric';

/**
 * LoginScreen component handling user authentication
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object
 * @returns {React.Component} LoginScreen component
 */
export default function LoginScreen({navigation}) {
  const theme = useTheme();
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
    bioChecked,
    setBioChecked,
  } = useLogin();
  const {getAvaialableBiometric, biometricKeysExist, handleBiometric} =
    useBiometric();

  const [bioAvailable, setBioAvailable] = useState(false);

  useEffect(() => {
    getAvaialableBiometric().then(result => {
      setBioAvailable(result);
    });
  }, []);

  useEffect(() => {
    if (bioAvailable.available) {
      biometricKeysExist().then(result => {
        if (result) {
          handleBiometric(result);
        }
      });
    }
  }, [bioAvailable]);

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

        <View style={{marginBottom: 16}}>
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
            styleComponent={{marginBottom: 0}}
          />
          <Checkbox.Item
            label={`Setup ${bioAvailable.biometryType}`}
            status={bioChecked ? 'checked' : 'unchecked'}
            onPress={() => {
              setBioChecked(!bioChecked);
            }}
            style={{
              paddingTop: 0,
              marginBottom: 0,
            }}
          />
        </View>

        <Button
          mode="contained-tonal"
          onPress={handleLogin}
          loading={loading}
          style={[styles.button, {backgroundColor: theme.colors.primary}]}
          labelStyle={{color: theme.colors.onPrimary}}>
          Login
        </Button>

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
    marginTop: 200,
    paddingHorizontal: 40,
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
  button: {
    width: '50%',
    marginHorizontal: 'auto',
    borderRadius: 25,
    paddingVertical: 3,
  },
});
