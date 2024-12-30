import {useState, useContext, useEffect} from 'react';
import {AuthContext} from '../context/AuthContext';
import {useBiometric} from './useBiometric';
/**
 * Custom hook to handle login logic
 * @returns {Object} Login state and handlers
 */
export const useLogin = () => {
  const [email, setEmail] = useState('Miras_A@hotmail.com');
  const [password, setPassword] = useState('Miras2010');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bioChecked, setBioChecked] = useState(false);
  const {login, user} = useContext(AuthContext);
  const {handleBiometric} = useBiometric();

  useEffect(() => {
    if (user) {
      console.log('user', user);
      console.log('bioChecked', bioChecked);
      if (bioChecked) {
        handleBiometric(false, user.uid);
      }
    }
  }, [user]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(email, password, bioChecked);
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
    bioChecked,
    setBioChecked,
  };
};
