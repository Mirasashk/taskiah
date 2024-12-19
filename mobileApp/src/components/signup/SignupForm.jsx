import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';
import FormInput from '../common/FormInput';
import {useSignupForm} from '../../hooks/useSignupForm';

const SignupForm = () => {
  const {signUp} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();

  const {formData, errors, handleChange, handleSubmit} = useSignupForm(signUp);

  const styles = StyleSheet.create({
    button: {
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
    },
  });

  return (
    <View>
      <FormInput
        label="First Name"
        value={formData.firstName}
        onChangeText={value => handleChange('firstName', value)}
        error={errors.firstName}
      />

      <FormInput
        label="Last Name"
        value={formData.lastName}
        onChangeText={value => handleChange('lastName', value)}
        error={errors.lastName}
      />

      <FormInput
        label="Email"
        value={formData.email}
        onChangeText={value => handleChange('email', value)}
        error={errors.email}
      />

      <FormInput
        label="Username"
        value={formData.username}
        onChangeText={value => handleChange('username', value)}
        error={errors.username}
      />

      <FormInput
        label="Password"
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupForm;
