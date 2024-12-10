import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../theme/ThemeProvider';

export const ThemeToggle = () => {
  const {isDarkMode, toggleTheme, theme} = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        padding: theme.spacing.sm,
        marginRight: theme.spacing.sm,
      }}>
      <Icon
        name={isDarkMode ? 'sunny' : 'moon'}
        size={24}
        color={theme.colors.text}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggle;
