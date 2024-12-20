import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {tabStyles} from '../../theme/components/tab.styles';
import PropTypes from 'prop-types';

/**
 * Custom tab label component with icon
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.focused - Whether the tab is focused
 * @param {string} props.label - Label text to display
 * @param {Object} props.theme - Theme object
 * @param {boolean} [props.showIcon] - Whether to show the plus icon
 * @returns {React.ReactElement} Tab label component
 */
const TabLabel = ({focused, label, theme, showIcon = false}) => (
  <View style={tabStyles.labelContainer}>
    <Text
      style={{
        color: focused ? theme.colors.primary : theme.colors.onSurface,
      }}>
      {label}
    </Text>
    {showIcon && (
      <MaterialCommunityIcons
        name="plus"
        size={16}
        testID="plus-icon"
        style={{
          color: focused ? theme.colors.primary : theme.colors.onSurface,
        }}
      />
    )}
  </View>
);

TabLabel.propTypes = {
  focused: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  showIcon: PropTypes.bool,
};

export default TabLabel;
