import React from 'react';
import {View} from 'react-native';
import {Card, Avatar, IconButton} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * StatsCard Component
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.icon - Icon name for the avatar
 * @param {Function} [props.onPress] - Optional callback for card press
 */
const StatsCard = ({title, subtitle, icon, onPress}) => {
  const theme = useTheme();

  const renderAvatar = props => (
    <Avatar.Icon
      {...props}
      size={48}
      icon={() => <Icon name={icon} size={32} color={theme.colors.onSurface} />}
      color={theme.colors.onSurface}
      style={{backgroundColor: theme.colors.surfaceContainerHigh}}
    />
  );

  const renderChevron = props => (
    <IconButton
      {...props}
      icon="chevron-right"
      size={24}
      color={theme.colors.onSurface}
      onPress={onPress}
    />
  );

  return (
    <View>
      <Card mode="contained" elevation={1} onPress={onPress}>
        <Card.Title
          title={title}
          subtitle={subtitle}
          left={renderAvatar}
          right={renderChevron}
        />
      </Card>
    </View>
  );
};

export default StatsCard;
