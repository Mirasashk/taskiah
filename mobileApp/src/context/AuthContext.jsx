import React, {createContext, useState, useContext, useEffect} from 'react';
import {auth} from '../config/firebase';
import {getUserProfile, createUserProfile} from '../services/userApi';
import {storage} from '../config/firebase';

import {storeUserData, processUserData} from '../utils/authUtils';

/**
 * @typedef {Object} AuthContextType
 * @property {Object|null} user - Current user object
 * @property {boolean} loading - Loading state
 * @property {Function} login - Login function
 * @property {Function} signOut - Sign out function
 * @property {Function} signUp - Sign up function
 */

/**
 * Authentication context
 * @type {React.Context<AuthContextType>}
 */
export const AuthContext = createContext({});

/**
 * Authentication Provider Component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const handleAuthStateChange = async firebaseUser => {
      try {
        if (firebaseUser) {
          const userProfile = await getUserProfile(firebaseUser.uid);
          const processedUser = processUserData(firebaseUser, userProfile);
          setUser(processedUser);
          await storeUserData(userProfile);
        } else {
          setUser(null);
          await storeUserData(null);
        }
      } catch (error) {
        console.error('Auth state handling error:', error);
        await signOut();
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChange);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      const loadImage = async () => {
        const imageUrl = await getUserImage();
        setImage(imageUrl);
      };
      loadImage();
    }
  }, [user]);

  /**
   * Handles user login
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Firebase user object
   */
  const login = async (email, password) => {
    try {
      const {user: firebaseUser} = await auth.signInWithEmailAndPassword(
        email,
        password,
      );
      return firebaseUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * Handles user sign out
   * @returns {Promise<void>}
   */
  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  /**
   * Handles user registration
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Created user object
   */
  const signUp = async userData => {
    try {
      const {user: firebaseUser} = await auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password,
      );

      const userProfile = await createUserProfile({
        ...userData,
        id: firebaseUser.uid,
        isActive: true,
      });

      await storeUserData(userProfile);
      return firebaseUser;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const getUserImage = async () => {
    const imageRef = storage.ref(user.photoURL);
    try {
      const imageUrl = await imageRef.getDownloadURL();
      console.log(imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error getting user image:', error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        image,
        login,
        signOut,
        signUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @returns {AuthContextType} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
