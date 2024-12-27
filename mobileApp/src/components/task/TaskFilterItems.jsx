import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon, List, useTheme} from 'react-native-paper';
import ColorDot from '../common/ColorDot';
import {styles} from './styles/TaskFilterItems.styles';

/**
 * Renders a filter item with an icon/color dot, title, and count
 * @component
 * @param {Object} props
 * @param {number} props.count - Number of items for this filter
 * @param {string} props.title - Title of the filter
 * @param {string} props.icon - Icon name for the filter
 * @param {Function} props.onPress - Callback when filter is pressed
 * @param {string} [props.color] - Optional color for the filter dot
 * @returns {React.ReactElement} Filter item component
 */
const TaskFilterItems = ({count, title, icon, onPress, color}) => {
  const theme = useTheme();

  const renderLeftContent = () => (
    <View style={styles.rowCenter}>
      {color ? (
        <View style={styles.rowCenter}>
          <ColorDot color={color} style={{marginLeft: 10}} />
        </View>
      ) : (
        <Icon source={icon} size={24} />
      )}
    </View>
  );

  const renderRightContent = () => (
    <View style={styles.rightContainer}>
      <Text style={{color: theme.colors.onSurface}}>{count}</Text>
      {color && <Icon source="trash-can" size={24} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <List.Item
          title={title}
          titleStyle={{color: theme.colors.onSurface}}
          left={renderLeftContent}
          right={renderRightContent}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TaskFilterItems;
