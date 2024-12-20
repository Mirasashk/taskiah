import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StatsSection from '../components/dashboard/StatsSection';
import NotificationsSection from '../components/dashboard/NotificationsSection';
import {useTaskContext} from '../context/TaskContext';
import {useAuth} from '../context/AuthContext';
import {dashboardStyles} from '../theme/dashboard';

/**
 * Dashboard screen component that displays task statistics and notifications
 * @returns {React.ReactElement} Dashboard screen component
 */
const DashboardScreen = () => {
  const navigation = useNavigation();
  const {getTasks, tasks} = useTaskContext();
  const {user} = useAuth();
  const [stats, setStats] = useState({
    active: 0,
    completed: 0,
    overdue: 0,
  });

  // Load task stats once when component mounts
  useEffect(() => {
    let isMounted = true;

    const fetchTaskStats = async () => {
      try {
        await getTasks();

        // Only update state if component is still mounted
        if (isMounted && Array.isArray(tasks)) {
          const now = new Date();
          setStats({
            active: tasks.filter(task => task.status === 'active').length,
            completed: tasks.filter(task => task.status === 'completed').length,
            overdue: tasks.filter(
              task => task.status === 'active' && new Date(task.dueDate) < now,
            ).length,
          });
        }
      } catch (error) {
        console.error('Error fetching task stats:', error);
      }
    };

    fetchTaskStats();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleTaskPress = () => {
    navigation.navigate('TaskScreen');
  };

  return (
    <View style={dashboardStyles.container}>
      <StatsSection stats={stats} onTaskPress={handleTaskPress} />
      <NotificationsSection />
    </View>
  );
};

export default DashboardScreen;
