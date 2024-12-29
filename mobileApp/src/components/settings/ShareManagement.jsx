import React, {useState} from 'react';
import {View} from 'react-native';
import {List, IconButton, Text, useTheme} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useTaskContext} from '../../context/TaskContext';

/**
 * Component for managing shared list access
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.sharedLists - Array of shared list objects
 */
const ShareManagement = ({sharedLists}) => {
  const theme = useTheme();
  const {updateListSharing, removeSharedAccess} = useTaskContext();

  const handleRemoveAccess = async (listId, userId) => {
    try {
      await removeSharedAccess(listId, userId);
    } catch (error) {
      console.error('Failed to remove access:', error);
    }
  };

  return (
    <List.Section>
      <List.Subheader>Shared Lists</List.Subheader>
      {sharedLists?.map(list => (
        <List.Item
          key={list.id}
          title={list.name}
          description={`Shared with ${list.sharedWith.length} users`}
          left={props => <List.Icon {...props} icon="share" />}
          right={props => (
            <IconButton
              icon="account-remove"
              onPress={() => handleRemoveAccess(list.id)}
            />
          )}
        />
      ))}
      {sharedLists?.length === 0 && (
        <Text style={{padding: 16, color: theme.colors.onSurfaceVariant}}>
          No shared lists
        </Text>
      )}
    </List.Section>
  );
};

ShareManagement.propTypes = {
  sharedLists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sharedWith: PropTypes.array.isRequired,
    }),
  ).isRequired,
};

export default ShareManagement;
