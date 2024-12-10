import React, {createContext, useState, useContext, useEffect} from 'react';
import {auth} from '../config/firebase';
import {getUserProfile} from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        console.error('Error handling auth state:', error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const {user: firebaseUser} = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const userProfile = await getUserProfile(firebaseUser.uid);
      setUser({...firebaseUser, ...userProfile});
      return userProfile;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{user, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
