import {useState, useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

/**
 * Custom hook to handle login logic
 * @returns {Object} Login state and handlers
 */
export const useLogin = () => {
  const [email, setEmail] = useState('Miras_A@hotmail.com');
  const [password, setPassword] = useState('Miras2010');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {login} = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(email, password);
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleLogin,
  };
};
