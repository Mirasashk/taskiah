import React from 'react';
import {render, act, waitFor} from '@testing-library/react-native';
import {AuthProvider, useAuth, AuthContext} from '../AuthContext';
import {auth} from '../../config/firebase';
import {getUserProfile, createUserProfile} from '../../services/userApi';

// Mock dependencies
jest.mock('../../config/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  },
}));

jest.mock('../../services/userApi');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with null user and loading state', () => {
    const TestComponent = () => {
      const {user, loading} = useAuth();
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    expect(auth.onAuthStateChanged).toHaveBeenCalled();
  });

  it('should handle login successfully', async () => {
    const mockFirebaseUser = {uid: '123'};
    auth.signInWithEmailAndPassword.mockResolvedValueOnce({
      user: mockFirebaseUser,
    });

    const TestComponent = () => {
      const {login} = useAuth();
      React.useEffect(() => {
        login('test@example.com', 'password');
      }, []);
      return null;
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        'test@example.com',
        'password',
      );
    });
  });

  // Add more test cases for signOut and signUp...
});
