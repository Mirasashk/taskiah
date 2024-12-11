import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatsCard from '../components/dashboard/StatsCard';

const DashboardScreen = () => {
  useEffect(() => {
    console.log('DashboardScreen mounted');
    console.log(AsyncStorage.getAllKeys());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text variant="titleLarge">Tasks</Text>
        <StatsCard
          title="Active tasks"
          subtitle="100"
          icon="clipboard-edit-outline"
          onPress={() => navigation.navigate('TaskScreen')}
        />
        <StatsCard
          title="Completed tasks"
          subtitle="100"
          icon="clipboard-check-outline"
        />
        <StatsCard
          title="Overdue tasks"
          subtitle="100"
          icon="clipboard-alert-outline"
        />
      </View>
      <View style={styles.notificationsContainer}>
        <Text variant="titleLarge">Notifications</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
  },
  statsContainer: {
    gap: 8,
  },
  notificationsContainer: {
    gap: 8,
  },
});

export default DashboardScreen;
