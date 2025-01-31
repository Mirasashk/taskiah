import React, {createContext, useState, useContext, useEffect} from 'react';
import {AppState, InteractionManager} from 'react-native';
import {myAuth} from '../config/firebase';
import {getUserProfile, createUserProfile} from '../services/userApi';
import {myStorage} from '../config/firebase';

import {processUserData} from '../utils/authUtils';
import {
  startSessionTimer,
  resetSessionTimer,
  clearSessionTimer,
} from '../utils/sessionTimer';
import {useBiometric} from '../hooks/useBiometric';
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
  const {handleBiometric} = useBiometric();
  const handleSessionTimeout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Session timeout signout error:', error);
    }
  };

  // Start session timer when user logs in
  useEffect(() => {
    if (user) {
      startSessionTimer(handleSessionTimeout);
    } else {
      clearSessionTimer();
    }
    return () => clearSessionTimer();
  }, [user]);

  // Reset timer on user activity
  const resetTimer = () => {
    if (user) {
      resetSessionTimer(handleSessionTimeout);
    }
  };

  // Track user interactions using React Native's InteractionManager
  useEffect(() => {
    if (user) {
      const subscription = InteractionManager.createInteractionHandle();
      const appStateSubscription = AppState.addEventListener(
        'change',
        nextAppState => {
          if (nextAppState === 'active') {
            resetTimer();
          }
        },
      );

      // Reset timer on any interaction completion
      InteractionManager.runAfterInteractions(() => {
        resetTimer();
      });

      return () => {
        InteractionManager.clearInteractionHandle(subscription);
        appStateSubscription.remove();
      };
    }
  }, [user]);

  // Existing useEffect for auth state changes
  useEffect(() => {
    const handleAuthStateChange = async firebaseUser => {
      try {
        if (firebaseUser) {
          const userProfile = await getUserProfile(firebaseUser.uid);
          const processedUser = processUserData(firebaseUser, userProfile);
          setUser(processedUser);
          startSessionTimer(handleSessionTimeout); // Start timer on login
        } else {
          setUser(null);
          clearSessionTimer(); // Clear timer on logout
        }
      } catch (error) {
        console.error('Auth state handling error:', error);
        await signOut();
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = myAuth.onAuthStateChanged(handleAuthStateChange);
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
  const login = async (email, password, bioChecked) => {
    try {
      const {user: firebaseUser} = await myAuth.signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('bioChecked', bioChecked);
      if (bioChecked) {
        await handleBiometric(false, firebaseUser.uid);
      }
      return firebaseUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithBiometric = async token => {
    try {
      setLoading(true);
      const {user: firebaseUser} = await myAuth.signInWithCustomToken(token);

      return firebaseUser;
    } catch (error) {
      console.error('Login with biometric error:', error);
      throw error;
    }
  };

  /**
   * Handles user sign out
   * @returns {Promise<void>}
   */
  const signOut = async () => {
    try {
      await myAuth.signOut();
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
      const {user: firebaseUser} = await myAuth.createUserWithEmailAndPassword(
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

  const setupBiometric = async () => {
    console.log('Setup Biometric AuthContext');
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
        setupBiometric,
        loginWithBiometric,
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
