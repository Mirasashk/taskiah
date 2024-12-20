import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import DrawerMain from '../DrawerMain';

// Mock the navigation prop
const mockNavigation = {
  closeDrawer: jest.fn(),
};

describe('DrawerMain', () => {
  it('renders correctly', () => {
    const {getByText} = render(<DrawerMain navigation={mockNavigation} />);

    expect(getByText('App Name')).toBeTruthy();
    expect(getByText('Custom Action')).toBeTruthy();
  });

  it('handles custom action correctly', () => {
    const {getByText} = render(<DrawerMain navigation={mockNavigation} />);

    fireEvent.press(getByText('Custom Action'));
    expect(mockNavigation.closeDrawer).toHaveBeenCalled();
  });
});
