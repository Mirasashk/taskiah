import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../../context/ThemeContext';
import {styles} from './ThemeToggle.styles';

/**
 * ThemeToggle Component
 * @description A button component that toggles between light and dark themes
 * @component
 * @example
 * ```jsx
 * <ThemeToggle />
 * ```
 * @returns {React.ReactElement} A touchable button with an icon that changes based on theme
 */
export const ThemeToggle = () => {
  const {isThemeDark, toggleTheme, theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={styles.container(theme)}
      accessibilityLabel="Toggle theme"
      accessibilityRole="button">
      <Icon
        name={isThemeDark ? 'sunny' : 'moon'}
        size={24}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;
