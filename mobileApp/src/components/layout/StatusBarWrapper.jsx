import React from 'react';
import {StatusBar} from 'react-native';
import PropTypes from 'prop-types';

/**
 * A wrapper component for React Native's StatusBar that handles theme-based styling
 * @param {Object} props
 * @param {Object} props.theme - The theme object containing colors and dark mode setting
 * @param {Object} props.theme.colors - Theme colors object
 * @param {boolean} props.theme.dark - Whether dark mode is enabled
 * @returns {React.Component} StatusBar component with theme-based styling
 */
export const StatusBarWrapper = ({theme}) => (
  <StatusBar
    backgroundColor={theme.colors.surfaceContainerHigh}
    barStyle={theme.dark ? 'light-content' : 'dark-content'}
  />
);

StatusBarWrapper.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      surfaceContainerHigh: PropTypes.string.isRequired,
    }).isRequired,
    dark: PropTypes.bool.isRequired,
  }).isRequired,
};
