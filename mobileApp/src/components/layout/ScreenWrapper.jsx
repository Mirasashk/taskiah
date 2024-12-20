import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import Header from '../common/Header';
import {layoutStyles} from '../../theme/styles/layout';

/**
 * A wrapper component that provides a consistent layout structure for screens
 * including a header and content area.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render in the content area
 * @param {string} props.title - Title to display in the header
 * @param {Object} props.navigation - Navigation object from React Navigation
 * @returns {React.ReactElement} ScreenWrapper component
 */
const ScreenWrapper = ({children, title, navigation}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        layoutStyles.screenContainer,
        {backgroundColor: theme.colors.surface},
      ]}
      testID="screen-wrapper">
      <Header title={title} openDrawer={() => navigation.openDrawer()} />
      {children}
    </View>
  );
};

ScreenWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func.isRequired,
  }).isRequired,
};

export default ScreenWrapper;
