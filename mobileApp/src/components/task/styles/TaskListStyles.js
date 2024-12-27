import {StyleSheet} from 'react-native';

export const TaskListStyles = StyleSheet.create({
  emptyContainer: {
    marginLeft: 24,
    marginTop: 12,
  },
  container: {
    flex: 1,
    paddingTop: 6,
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
