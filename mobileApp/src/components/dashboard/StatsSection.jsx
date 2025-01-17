import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import StatsCard from './StatsCard';
import {DashboardStyles} from './styles/DashboardStyles';
import {useTheme} from 'react-native-paper';
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
const StatsSection = ({onTaskPress, stats}) => {
  const theme = useTheme();

  return (
    <View style={DashboardStyles.statsContainer}>
      <Text variant="titleLarge">Dashboard</Text>
      <StatsCard
        title="Active tasks"
        value={stats.active.toString()}
        icon="clock-outline"
        trend="up"
        trendValue={100}
        onPress={() => onTaskPress('active')}
        iconColor={theme.colors.primary}
      />
      <StatsCard
        title="Completed This Week"
        value={stats.completed.toString()}
        icon="checkbox-marked-outline"
        trend="up"
        trendValue={100}
        onPress={() => onTaskPress('important')}
        iconColor={theme.colors.tertiary}
      />
      <StatsCard
        title="Overdue"
        value={stats.overdue.toString()}
        icon="calendar-alert"
        trend="up"
        trendValue={100}
        onPress={() => onTaskPress('pastdue')}
        iconColor={theme.colors.error}
      />
    </View>
  );
};

export default StatsSection;
