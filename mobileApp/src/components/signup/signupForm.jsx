import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';

const signupForm = () => {
  const {signUp} = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const theme = useTheme();

  const [formData, setFormData] = useState({
    id: '',
    email: 'miras@gmail.com',
    firstName: 'Miras',
    lastName: 'Khan',
    username: 'miras',
    password: 'Miras2010',
    confirmPassword: 'Miras2010',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,

      padding: 0,
      borderRadius: 5,
      marginBottom: 10,
    },
    button: {
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 12,
      marginBottom: 5,
    },
    label: {
      color: theme.colors.error,
    },
  });

  const validatePassword = password => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));

    // Validate password
    if (name === 'password') {
      if (!validatePassword(value)) {
        setErrors(prev => ({
          ...prev,
          password:
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
        }));
      }
    }

    // Validate confirm password
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match',
        }));
      }
    }

    // Validate email
    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address',
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    Object.keys(formData).forEach(key => {
      if (key === 'id') return;
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      console.log('Form is valid', formData);
      signUp(formData);
      // Proceed with signup
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <View>
      <TextInput
        style={[styles.input, errors.firstName && styles.inputError]}
        placeholder="First Name"
        label="First Name"
        error={errors.firstName ? true : false}
        value={formData.firstName}
        onChangeText={value => handleChange('firstName', value)}
        autoCapitalize="none"
      />
      {errors.firstName && (
        <Text style={styles.errorText}>{errors.firstName}</Text>
      )}

      <TextInput
        style={[styles.input, errors.lastName && styles.inputError]}
        placeholder="Last Name"
        label="Last Name"
        error={errors.lastName ? true : false}
        value={formData.lastName}
        onChangeText={value => handleChange('lastName', value)}
        autoCapitalize="none"
      />
      {errors.lastName && (
        <Text style={styles.errorText}>{errors.lastName}</Text>
      )}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        label="Email"
        error={errors.email ? true : false}
        value={formData.email}
        onChangeText={value => handleChange('email', value)}
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.username && styles.inputError]}
        placeholder="Username"
        label="Username"
        error={errors.username ? true : false}
        value={formData.username}
        onChangeText={value => handleChange('username', value)}
        autoCapitalize="none"
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password"
        label="Password"
        error={errors.password ? true : false}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        value={formData.password}
        onChangeText={value => handleChange('password', value)}
        secureTextEntry={!showPassword}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirm Password"
        label="Confirm Password"
        error={errors.confirmPassword ? true : false}
        right={
          <TextInput.Icon
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        }
        value={formData.confirmPassword}
        onChangeText={value => handleChange('confirmPassword', value)}
        secureTextEntry={!showConfirmPassword}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default signupForm;
