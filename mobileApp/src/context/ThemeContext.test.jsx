import React, {useContext} from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {ThemeContext} from './ThemeContext';

describe('ThemeContext', () => {
  // Test component that uses the ThemeContext
  const TestComponent = () => {
    const {isThemeDark, toggleTheme} = useContext(ThemeContext);
    return (
      <div>
        <div data-testid="theme-status">
          {isThemeDark ? 'Dark Theme' : 'Light Theme'}
        </div>
        <button onClick={toggleTheme} data-testid="toggle-button">
          Toggle Theme
        </button>
      </div>
    );
  };

  it('should provide default values', () => {
    render(
      <ThemeContext.Provider
        value={{isThemeDark: false, toggleTheme: () => {}}}>
        <TestComponent />
      </ThemeContext.Provider>,
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('Light Theme');
  });

  it('should update theme when toggleTheme is called', () => {
    let isThemeDark = false;
    const toggleTheme = () => {
      isThemeDark = !isThemeDark;
      rerender(
        <ThemeContext.Provider value={{isThemeDark, toggleTheme}}>
          <TestComponent />
        </ThemeContext.Provider>,
      );
    };

    const {rerender} = render(
      <ThemeContext.Provider value={{isThemeDark, toggleTheme}}>
        <TestComponent />
      </ThemeContext.Provider>,
    );

    expect(screen.getByTestId('theme-status')).toHaveTextContent('Light Theme');

    fireEvent.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('theme-status')).toHaveTextContent('Dark Theme');
  });
});
