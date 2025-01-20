import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import AddListTab from '../components/task/AddListTab';

const CreateListScreen = () => {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.surfaceContainerHigh,
        padding: 20,
      }}>
      <AddListTab />
    </View>
  );
};

export default CreateListScreen;
