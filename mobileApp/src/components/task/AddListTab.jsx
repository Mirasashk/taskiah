import React from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {addListStyles} from '../../theme/components/addList.styles';

/**
 * AddListTab component that displays the add list interface
 * @component
 * @returns {React.ReactElement} Add list tab component
 */
const AddListTab = () => {
  const theme = useTheme();

  return (
    <View
      style={[
        addListStyles.container,
        {backgroundColor: theme.colors.surfaceContainerHigh},
      ]}>
      <Text>Add new list here</Text>
    </View>
  );
};

export default AddListTab;
