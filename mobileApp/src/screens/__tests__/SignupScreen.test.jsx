import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SignupScreen from '../SignupScreen';

describe('SignupScreen', () => {
  it('renders correctly', () => {
    render(<SignupScreen />);

    expect(screen.getByText('Sign Up')).toBeTruthy();
    expect(screen.getByText('Create an account to get started')).toBeTruthy();
  });

  it('contains SignupForm component', () => {
    const {UNSAFE_getByType} = render(<SignupScreen />);

    expect(UNSAFE_getByType('SignupForm')).toBeTruthy();
  });

  it('applies correct styles', () => {
    const {getByTestId} = render(<SignupScreen />);
    const container = getByTestId('signup-container');

    expect(container.props.style).toMatchObject({
      flex: 1,
      justifyContent: 'flex-start',
    });
  });
});
