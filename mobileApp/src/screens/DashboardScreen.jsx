import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StatsSection from '../components/dashboard/StatsSection';
import NotificationsSection from '../components/dashboard/NotificationsSection';
import {useTaskContext} from '../context/TaskContext';
import {useAuth} from '../context/AuthContext';
import {DashboardStyles} from '../components/dashboard/styles/DashboardStyles';

/**
 * Dashboard screen component that displays task statistics and notifications
 * @returns {React.ReactElement} Dashboard screen component
 */
const DashboardScreen = () => {
  const navigation = useNavigation();
  const {getTasks, tasks, completedTasks, setFilter} = useTaskContext();
  const {user} = useAuth();
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    overdue: 0,
  });

  // Load task stats once when component mounts
  useEffect(() => {
    const now = new Date();
    setStats({
      active: tasks.length,
      completed: completedTasks.length,
      overdue: tasks.filter(task => new Date(task.dueDate) < now).length,
    });
  }, [tasks, completedTasks]);

  const handleTaskPress = type => {
    if (type === 'active') {
      setFilter('All tasks');
      navigation.navigate('Tasks');
    } else if (type === 'important') {
      setFilter('important');
      navigation.navigate('Tasks');
    } else if (type === 'pastdue') {
      setFilter('pastdue');
      navigation.navigate('Tasks');
    }
  };

  return (
    <View style={DashboardStyles.container}>
      <StatsSection stats={stats} onTaskPress={handleTaskPress} />
      <NotificationsSection navigation={navigation} />
    </View>
  );
};

export default DashboardScreen;
