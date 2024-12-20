import React, {createContext, useState, useContext, useEffect} from 'react';
import {auth} from '../config/firebase';
import {getUserProfile, createUserProfile} from '../services/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		// Handle user state changes
		const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
			console.log('Unsubscribing...', firebaseUser.uid);
			try {
				if (firebaseUser) {
					// Get additional user info from backend
					const userProfile = await getUserProfile(firebaseUser.uid);
					setUser({...firebaseUser, ...userProfile});
					await AsyncStorage.setItem(
						'user',
						JSON.stringify(userProfile),
					);
				} else {
					setUser(null);
					await AsyncStorage.removeItem('user');
				}
			} catch (error) {
				signOut();
				console.error('Error handling auth state:', error);
			} finally {
				setLoading(false);
			}
		});

		return unsubscribe;
	}, []);

	const login = async (email, password) => {
		try {
			const {user: firebaseUser} = await auth.signInWithEmailAndPassword(
				email,
				password,
			);
			console.log('API_URL:', Config.API_URL);
			console.log('Making login request...');
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

	const signOut = async () => {
		try {
			console.log('Signing out...');
			await auth.signOut();
			setUser(null);
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	const signUp = async userData => {
		console.log('signup', userData);
		try {
			const {user: firebaseUser} = await auth
				.createUserWithEmailAndPassword(
					userData.email,
					userData.password,
				)
				.then(async response => {
					try {
						userData.id = response.user.uid;
						userData.isActive = true;
						const userProfile = await createUserProfile(userData);
						await AsyncStorage.setItem(
							'user',
							JSON.stringify(userProfile),
						);
						return userProfile;
					} catch (error) {
						console.error('Error creating user profile:', error);
					}
				});
			return firebaseUser;
		} catch (error) {
			console.error('Error signing up:', error);
		}
	};

	const value = {
		user,
		loading,
		login,
		signOut,
		signUp,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
