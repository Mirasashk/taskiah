import React, {createContext, useState, useContext, useEffect} from 'react';
import {auth} from '../config/firebase';
import {getUserProfile} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle user state changes
    const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
      try {
        if (firebaseUser) {
          // Get additional user info from backend
          const userProfile = await getUserProfile(firebaseUser.uid);
          setUser({...firebaseUser, ...userProfile});
          await AsyncStorage.setItem('user', JSON.stringify(userProfile));
        } else {
          setUser(null);
          await AsyncStorage.removeItem('user');
        }
      } catch (error) {
        logout();
        console.error('Error handling auth state:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    console.log('API_URL:', Config.API_URL);
    console.log('Making login request...');

    try {
      const {user: firebaseUser} = await auth.signInWithEmailAndPassword(
        email,
        password,
      );
      return firebaseUser;
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        config: error.config,
        response: error.response,
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
