import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StatsSection from '../components/dashboard/StatsSection';
import NotificationsSection from '../components/dashboard/NotificationsSection';
import CalendarSection from '../components/dashboard/CalendarSection';
import {useTaskContext} from '../context/TaskContext';
import {useAuth} from '../context/AuthContext';
import {DashboardStyles} from '../components/dashboard/styles/DashboardStyles';
import {useListContext} from '../context/ListContext';

/**
 * Dashboard screen component that displays task statistics and notifications
 * @returns {React.ReactElement} Dashboard screen component
 */
const DashboardScreen = () => {
  const navigation = useNavigation();
  const {getTasks, tasks, completedTasks, setFilter} = useTaskContext();
  const {lists, selectedList, setSelectedList} = useListContext();
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
      active: tasks?.length || 0,
      completed: completedTasks?.length || 0,
      overdue: tasks?.filter(task => new Date(task.dueDate) < now)?.length || 0,
    });
  }, [tasks, completedTasks]);

  const handleTaskPress = type => {
    if (type === 'active') {
      setSelectedList(null);
      navigation.navigate('Tasks');
    } else if (type === 'important') {
      setSelectedList('important');
      navigation.navigate('Tasks');
    } else if (type === 'pastdue') {
      setSelectedList('pastdue');
      navigation.navigate('Tasks');
    }
  };

  return (
    <ScrollView
      style={DashboardStyles.container}
      contentContainerStyle={{
        paddingBottom: 24,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}>
      <StatsSection stats={stats} onTaskPress={handleTaskPress} />
      <CalendarSection />
      <NotificationsSection />
    </ScrollView>
  );
};

export default DashboardScreen;
