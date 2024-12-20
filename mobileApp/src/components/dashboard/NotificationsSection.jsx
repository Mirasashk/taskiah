import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {dashboardStyles} from '../../theme/dashboard';

/**
 * Renders the notifications section of the dashboard
 * @returns {React.ReactElement} Notifications section component
 */
const NotificationsSection = () => (
  <View style={dashboardStyles.notificationsContainer}>
    <Text variant="titleLarge">Notifications</Text>
  </View>
);

export default NotificationsSection;
