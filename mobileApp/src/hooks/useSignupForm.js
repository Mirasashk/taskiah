import {useState} from 'react';
import {validatePassword, validateEmail} from '../utils/validation';

/**
 * @typedef {Object} FormData
 * @property {string} id
 * @property {string} email
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} username
 * @property {string} password
 * @property {string} confirmPassword
 */

/**
 * @typedef {Object} FormErrors
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {string} confirmPassword
 */

const initialFormData = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const initialErrors = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

/**
 * Custom hook for managing signup form state and validation
 *
 * @param {Function} onSubmit - Callback function to handle form submission
 * @returns {Object} Form state and handlers
 * @property {FormData} formData - Current form data
 * @property {FormErrors} errors - Current form validation errors
 * @property {Function} handleChange - Handler for form field changes
 * @property {Function} handleSubmit - Handler for form submission
 */
export const useSignupForm = onSubmit => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));

    // Validate fields
    if (name === 'password') {
      if (!validatePassword(value)) {
        setErrors(prev => ({
          ...prev,
          password:
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
        }));
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirmPassword: 'Passwords do not match',
        }));
      }
    }

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

    Object.keys(formData).forEach(key => {
      if (key === 'id') return;
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};
