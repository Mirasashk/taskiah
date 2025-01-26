import React, {useState, useCallback} from 'react';
import {BottomNavigation} from 'react-native-paper';
import {AllLists as AllMyLists} from './AllLists';
import AddListTab from './AddListTab';
import {useTheme} from 'react-native-paper';

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

  const renderScene = useCallback(({route, jumpTo}) => {
    switch (route.key) {
      case 'allLists':
        return <AllMyLists navigation={{jumpTo}} />;
      case 'addList':
        return <AddListTab navigation={{jumpTo}} />;
      default:
        return null;
    }
  }, []);

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
      compact={true}
      keyboardHidesNavigationBar={true}
      barStyle={{backgroundColor: theme.colors.surfaceContainerHigh}}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurface}
      getLabelText={({route}) => route.title}
      getIcon={({route, focused}) =>
        focused ? route.focusedIcon : route.unfocusedIcon
      }
    />
  );
};

export default AllListBottomNavigation;
