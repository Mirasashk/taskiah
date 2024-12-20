import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  actionButton: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
});

/**
 * Renders action buttons for list filtering and sorting
 * @component
 * @param {Object} props
 * @param {Function} props.onFilterPress - Callback function when filter button is pressed
 * @param {Function} props.onSortPress - Callback function when sort button is pressed
 * @returns {React.ReactElement} List actions component
 */
const ListActions = ({onFilterPress, onSortPress}) => (
  <View style={styles.actionButtons}>
    <IconButton icon="sort" onPress={onSortPress} style={styles.actionButton} />
    <IconButton
      icon="filter"
      onPress={onFilterPress}
      style={styles.actionButton}
    />
  </View>
);

ListActions.propTypes = {
  onFilterPress: PropTypes.func.isRequired,
  onSortPress: PropTypes.func.isRequired,
};

export default ListActions;
