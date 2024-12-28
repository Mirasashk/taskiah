import React from 'react';
import {View, ActivityIndicator, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import {useTheme} from 'react-native-paper';

/**
 * A reusable loading spinner component that centers its content
 * @param {Object} props - Component props
 * @param {string} [props.size='large'] - Size of the spinner ('large' or 'small')
 */
export const LoadingView = ({size = 'large'}) => {
  const theme = useTheme();

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: '90%',
      }}>
      <ActivityIndicator
        testID="loading-indicator"
        size={size}
        color={theme.colors?.primary || colors.primary}
      />
    </View>
  );
};

LoadingView.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
};

export default LoadingView;
