import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from '../../theme/colors';
import {loadingViewStyles as styles} from './styles';

/**
 * A reusable loading spinner component that centers its content
 * @param {Object} props - Component props
 * @param {Object} props.theme - Theme object containing colors
 * @param {string} [props.size='large'] - Size of the spinner ('large' or 'small')
 */
export const LoadingView = ({theme = {colors}, size = 'large'}) => (
  <View style={styles.container}>
    <ActivityIndicator
      testID="loading-indicator"
      size={size}
      color={theme.colors?.primary || colors.primary}
    />
  </View>
);

LoadingView.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      primary: PropTypes.string,
    }),
  }),
  size: PropTypes.oneOf(['small', 'large']),
};
