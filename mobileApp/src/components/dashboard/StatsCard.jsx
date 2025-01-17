import React from 'react';
import {View} from 'react-native';
import {Card, Avatar, Text} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * StatsCard Component
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string} props.value - Main value to display
 * @param {string} props.icon - Icon name for the avatar
 * @param {string} props.trend - Direction of trend ('up' or 'down')
 * @param {number} props.trendValue - Percentage value of trend
 * @param {string} props.iconType - Type of icon ('light' or 'dark')
 * @param {Function} [props.onPress] - Optional callback for card press
 */
const StatsCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  onPress,
  iconColor,
}) => {
  const theme = useTheme();

  const renderAvatar = props => (
    <Avatar.Icon
      {...props}
      size={48}
      icon={() => <Icon name={icon} size={32} color={iconColor} />}
      style={{
        backgroundColor: theme.colors.surfaceContainerHigh,
        marginRight: 16,
        marginTop: 16,
      }}
    />
  );

  return (
    <Card mode="contained" elevation={1} onPress={onPress}>
      <Card.Title
        title={title}
        titleStyle={{
          color: theme.colors.onSurfaceVariant,
          fontSize: 14,
        }}
        subtitle={value}
        subtitleStyle={{
          color: theme.colors.onSurface,
          fontSize: 24,
          fontWeight: 'bold',
          paddingTop: 8,
        }}
        right={renderAvatar}
      />
      {trend && (
        <Card.Content
          style={{paddingTop: 8, flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: trend === 'up' ? '#4CAF50' : theme.colors.error,
              fontSize: 14,
              fontWeight: '500',
            }}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}%
          </Text>
          <Text
            style={{
              color: theme.colors.onSurfaceVariant,
              fontSize: 14,
              marginLeft: 8,
            }}>
            from last week
          </Text>
        </Card.Content>
      )}
    </Card>
  );
};

export default StatsCard;
