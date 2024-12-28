import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {DashboardStyles} from './styles/DashboardStyles';
import NotificationCard from './NotificationCard';
import {useNotification} from '../../context/NotificationContext';
import {useTaskContext} from '../../context/TaskContext';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const notificationTypes = theme => ({
  dueDate: {
    title: 'Due date',
    icon: 'calendar-alert',
    color: theme.colors.tertiary,
  },
  important: {
    title: 'Important',
    icon: 'flag-variant-outline',
    color: theme.colors.error,
  },
  reminder: {
    title: 'Reminder',
    icon: 'clock-outline',
    color: theme.colors.primary,
  },
});

/**
 * Renders the notifications section of the dashboard
 * @returns {React.ReactElement} Notifications section component
 */
const NotificationsSection = () => {
  const {notifications} = useNotification();
  const {tasks} = useTaskContext();
  const theme = useTheme();
  const navigation = useNavigation();

  const onTaskPress = taskId => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      navigation.navigate('Tasks', {
        screen: 'TaskDetail',
        params: {task},
      });
    }
  };

  const renderNotifications = () => {
    return notifications
      .slice(0, 3)
      .map(notification => (
        <NotificationCard
          key={notification.taskId + notification.type + notification.id}
          title={notificationTypes(theme)[notification.type].title}
          subtitle={notification.message}
          icon={notificationTypes(theme)[notification.type].icon}
          iconColor={notificationTypes(theme)[notification.type].color}
          onPress={() => onTaskPress(notification.taskId)}
        />
      ));
  };

  return (
    <View style={DashboardStyles.notificationsContainer}>
      <Text variant="titleLarge">Notifications</Text>
      {renderNotifications()}
    </View>
  );
};

export default NotificationsSection;
