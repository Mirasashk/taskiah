/**
 * @component ThemeToggle
 * @description A button component that toggles between light and dark themes
 * @param {Object} props
 * @param {boolean} props.isDark - Current theme state
 * @param {Function} props.onToggle - Theme toggle callback function
 * @returns {React.ReactElement}
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';

const ThemeToggle = ({isDark, onToggle}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <IconButton
        icon={isDark ? 'weather-sunny' : 'weather-night'}
        iconColor={theme.colors.background}
        size={24}
        onPress={onToggle}
        style={[styles.toggle, {backgroundColor: theme.colors.onBackground}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    padding: 0,
    margin: 0,
  },
  toggle: {
    marginLeft: 'auto',
  },
});

export default ThemeToggle;
