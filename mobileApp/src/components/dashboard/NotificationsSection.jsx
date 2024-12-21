import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {DashboardStyles} from './styles/DashboardStyles';

/**
 * Renders the notifications section of the dashboard
 * @returns {React.ReactElement} Notifications section component
 */
const NotificationsSection = () => (
  <View style={DashboardStyles.notificationsContainer}>
    <Text variant="titleLarge">Notifications</Text>
  </View>
);

export default NotificationsSection;
