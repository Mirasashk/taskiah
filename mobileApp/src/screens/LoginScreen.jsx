import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AuthContext} from '../context/AuthContext';

export default function LoginScreen({navigation}) {
  // TODO: Remove hardcoded email and password
  const [email, setEmail] = useState('miras_A@hotmail.com');
  const [password, setPassword] = useState('Miras2010');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {theme} = useContext(ThemeContext);
  const {login} = useContext(AuthContext);

  useEffect(() => {
    console.log('Text color', theme.colors.text);
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      console.log(email, password);
      await login(email, password);
      // Navigation will be handled by the navigation container based on auth state
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.formContainer}>
        <Text style={[styles.title, {color: theme.colors.primary}]}>Login</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={[
            styles.input,
            {
              borderColor: theme.colors.outline,
              color: theme.colors.onBackground,
            },
          ]}
          placeholder="Email"
          placeholderTextColor={theme.colors.placeholder}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={[
            styles.input,
            {
              borderColor: theme.colors.outline,
              color: theme.colors.onBackground,
            },
          ]}
          placeholder="Password"
          placeholderTextColor={theme.colors.placeholder}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.colors.primary}]}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
