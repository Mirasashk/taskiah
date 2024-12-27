import React from 'react';
import {render, act} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import {AppContent, PublicStack, PrivateRoutes} from '../index';

// Mock the required dependencies
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({children}) => children,
    Screen: ({children}) => children,
  }),
}));

jest.mock('../../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Navigation Components', () => {
  describe('AppContent', () => {
    it('should render LoadingView when loading is true', () => {
      useAuth.mockImplementation(() => ({
        loading: true,
        user: null,
      }));

      const {getByTestId} = render(<AppContent />);
      expect(getByTestId('loading-view')).toBeTruthy();
    });

    it('should render PublicStack when user is not authenticated', () => {
      useAuth.mockImplementation(() => ({
        loading: false,
        user: null,
      }));

      const {getByTestId} = render(<AppContent />);
      expect(getByTestId('public-stack')).toBeTruthy();
    });

    it('should render PrivateRoutes when user is authenticated', () => {
      useAuth.mockImplementation(() => ({
        loading: false,
        user: {id: '1'},
      }));

      const {getByTestId} = render(<AppContent />);
      expect(getByTestId('private-routes')).toBeTruthy();
    });
  });
});
