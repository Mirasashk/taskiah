import React, {useState, useContext} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import {Text, TextInput, Button, useTheme} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';
import FormInput from '../common/FormInput';
import {useSignupForm} from '../../hooks/useSignupForm';
import {SignUpFormStyles} from './styles/SignUpFormStyles';

/**
 * @typedef {Object} FormData
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} username - User's chosen username
 * @property {string} password - User's password
 * @property {string} confirmPassword - Password confirmation
 */

/**
 * SignupForm component for user registration
 * @component
 * @returns {JSX.Element} A form component with input fields for user registration
 *
 * @example
 * return (
 *   <SignupForm />
 * )
 */
const SignupForm = () => {
  const {signUp} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const theme = useTheme();

  const {formData, errors, handleChange, handleSubmit} = useSignupForm(signUp);

  const styles = SignUpFormStyles(theme);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <FormInput
            label="First Name"
            testID="first-name-input"
            value={formData.firstName}
            onChangeText={value => handleChange('firstName', value)}
            error={errors.firstName}
          />

          <FormInput
            label="Last Name"
            testID="last-name-input"
            value={formData.lastName}
            onChangeText={value => handleChange('lastName', value)}
            error={errors.lastName}
          />

          <FormInput
            label="Email"
            testID="email-input"
            value={formData.email}
            onChangeText={value => handleChange('email', value)}
            error={errors.email}
          />

          <FormInput
            label="Username"
            testID="username-input"
            value={formData.username}
            onChangeText={value => handleChange('username', value)}
            error={errors.username}
          />

          <FormInput
            label="Password"
            testID="password-input"
            value={formData.password}
            onChangeText={value => handleChange('password', value)}
            error={errors.password}
            secureTextEntry={!showPassword}
            rightIcon={
              <TextInput.Icon
                icon={showPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          <FormInput
            label="Confirm Password"
            testID="confirm-password-input"
            value={formData.confirmPassword}
            onChangeText={value => handleChange('confirmPassword', value)}
            error={errors.confirmPassword}
            secureTextEntry={!showConfirmPassword}
            rightIcon={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />

          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSubmit}
            testID="signup-button">
            Sign Up
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupForm;
