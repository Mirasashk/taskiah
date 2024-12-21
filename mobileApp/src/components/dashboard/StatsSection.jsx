import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import StatsCard from './StatsCard';
import {DashboardStyles} from './styles/DashboardStyles';

/**
 * @typedef {Object} StatsSectionProps
 * @property {Function} onTaskPress - Callback function when active tasks card is pressed
 * @property {Object} stats - Object containing task statistics
 * @property {number} stats.active - Number of active tasks
 * @property {number} stats.completed - Number of completed tasks
 * @property {number} stats.overdue - Number of overdue tasks
 */

/**
 * Renders the statistics section of the dashboard
 * @param {StatsSectionProps} props - Component props
 * @returns {React.ReactElement} Stats section component
 */
const StatsSection = ({onTaskPress, stats}) => (
  <View style={DashboardStyles.statsContainer}>
    <Text variant="titleLarge">Tasks</Text>
    <StatsCard
      title="Active tasks"
      subtitle={stats.active.toString()}
      icon="clipboard-edit-outline"
      onPress={onTaskPress}
    />
    <StatsCard
      title="Completed tasks"
      subtitle={stats.completed.toString()}
      icon="clipboard-check-outline"
    />
    <StatsCard
      title="Overdue tasks"
      subtitle={stats.overdue.toString()}
      icon="clipboard-alert-outline"
    />
  </View>
);

export default StatsSection;
