import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import PrivateStack from '../PrivateStack';

// Mock the required dependencies
jest.mock('@react-navigation/drawer', () => ({
  createDrawerNavigator: jest.fn().mockReturnValue({
    Navigator: ({children}) => children,
    Screen: ({children}) => children,
  }),
}));

jest.mock('../../components/header/Header', () => 'Header');
jest.mock('../../components/drawer/DrawerMain', () => 'DrawerMain');
jest.mock('../../screens/DashboardScreen', () => 'DashboardScreen');
jest.mock('../TaskNavigator', () => 'TaskNavigator');

describe('PrivateStack', () => {
  const wrapper = ({children}) => (
    <NavigationContainer>
      <PaperProvider>{children}</PaperProvider>
    </NavigationContainer>
  );

  it('renders without crashing', () => {
    const {getByTestId} = render(<PrivateStack />, {wrapper});
    expect(getByTestId('private-stack')).toBeTruthy();
  });

  it('contains both Dashboard and Tasks screens', () => {
    const {getByText} = render(<PrivateStack />, {wrapper});
    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByText('Tasks')).toBeTruthy();
  });
});
