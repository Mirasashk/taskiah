import React, {useState} from 'react';
import {BottomNavigation, Text} from 'react-native-paper';
import {AllLists as AllMyLists} from './AllLists';
import AddListTab from './AddListTab';

import {useTheme} from 'react-native-paper';

const AllListsRoute = () => <AllMyLists key="allLists" />;

const AddListRoute = () => <AddListTab key="addList" />;

const AllListBottomNavigation = () => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'allLists',
      title: 'All Lists',
      focusedIcon: 'ballot',
      unfocusedIcon: 'ballot-outline',
    },

    {
      key: 'addList',
      title: 'Add List',
      focusedIcon: 'plus-circle',
      unfocusedIcon: 'plus-circle-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    allLists: AllListsRoute,
    addList: AddListRoute,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      sceneAnimationEnabled={true}
      sceneAnimationType="shifting"
      keyboardHidesNavigationBar={true}
      barStyle={{backgroundColor: theme.colors.surfaceContainerHigh}}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurface}
    />
  );
};

export default AllListBottomNavigation;
