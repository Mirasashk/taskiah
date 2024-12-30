import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import SettingsScreen from '../SettingsScreen';
import {AuthProvider} from '../../context/AuthContext';
import {TaskProvider} from '../../context/TaskContext';

// Mock the contexts
jest.mock('../../context/AuthContext', () => ({
  useAuth: () => ({
    user: {
      preferences: {
        startLocation: 'dashboard',
        biometricsEnabled: false,
      },
    },
    updateUserPreferences: jest.fn(),
  }),
  AuthProvider: ({children}) => <>{children}</>,
}));

jest.mock('../../context/TaskContext', () => ({
  useTask: () => ({
    sharedLists: [],
    updateListSharing: jest.fn(),
    removeSharedAccess: jest.fn(),
  }),
  TaskProvider: ({children}) => <>{children}</>,
}));

describe('SettingsScreen', () => {
  const renderWithProviders = component => {
    return render(
      <AuthProvider>
        <TaskProvider>{component}</TaskProvider>
      </AuthProvider>,
    );
  };

  it('renders correctly', () => {
    const {getByText} = renderWithProviders(<SettingsScreen />);
    expect(getByText('App Preferences')).toBeTruthy();
    expect(getByText('Start Location')).toBeTruthy();
    expect(getByText('Biometric Authentication')).toBeTruthy();
  });

  it('opens start location picker when pressed', () => {
    const {getByText} = renderWithProviders(<SettingsScreen />);
    fireEvent.press(getByText('Start Location'));
    expect(getByText('Choose Start Location')).toBeTruthy();
  });

  it('toggles biometric authentication', () => {
    const {getByTestId} = renderWithProviders(<SettingsScreen />);
    const biometricSwitch = getByTestId('biometric-switch');
    fireEvent(biometricSwitch, 'valueChange', true);
    expect(biometricSwitch.props.value).toBe(true);
  });
});
