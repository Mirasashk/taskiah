import {StyleSheet} from 'react-native';

export const TaskListStyles = StyleSheet.create({
  emptyContainer: {},
  container: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
});
