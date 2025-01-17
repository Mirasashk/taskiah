import React from 'react';
import {View} from 'react-native';
import {Card, Avatar, IconButton} from 'react-native-paper';
import {useTheme} from 'react-native-paper';

/**
 * NotificationCard Component
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.subtitle - Card subtitle
 * @param {string} props.icon - Icon name for the avatar
 * @param {Function} [props.onPress] - Optional callback for card press
 */
const NotificationCard = ({title, subtitle, icon, iconColor, onPress}) => {
  const theme = useTheme();

  const renderAvatar = props => (
    <Avatar.Icon
      {...props}
      size={48}
      icon={icon}
      color={iconColor}
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
      <Card.Title
        title={title}
        subtitle={subtitle}
        left={renderAvatar}
        right={renderChevron}
      />
    </View>
  );
};

export default NotificationCard;
