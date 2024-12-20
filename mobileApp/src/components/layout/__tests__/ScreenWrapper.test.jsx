import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import ScreenWrapper from '../ScreenWrapper';

describe('ScreenWrapper', () => {
  const mockNavigation = {
    openDrawer: jest.fn(),
  };

  const defaultProps = {
    title: 'Test Screen',
    navigation: mockNavigation,
  };

  const setup = (props = {}) => {
    const combinedProps = {...defaultProps, ...props};
    return render(
      <PaperProvider>
        <ScreenWrapper {...combinedProps}>
          <Text>Test Content</Text>
        </ScreenWrapper>
      </PaperProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all required props', () => {
    const {getByTestId, getByText} = setup();

    expect(getByTestId('screen-wrapper')).toBeTruthy();
    expect(getByText('Test Screen')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('calls navigation.openDrawer when header menu is pressed', () => {
    const {getByTestId} = setup();

    fireEvent.press(getByTestId('header-menu-button'));
    expect(mockNavigation.openDrawer).toHaveBeenCalledTimes(1);
  });

  it('applies theme colors correctly', () => {
    const {getByTestId} = setup();
    const wrapper = getByTestId('screen-wrapper');

    expect(wrapper.props.style).toContainEqual(
      expect.objectContaining({
        backgroundColor: expect.any(String),
      }),
    );
  });
});
