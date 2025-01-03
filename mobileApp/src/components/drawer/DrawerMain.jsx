import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import createDrawerMainStyles from './styles/drawerMainStyles';

/**
 * Main drawer navigation component
 * @param {Object} props - Navigation props from React Navigation
 * @returns {React.ReactElement} Drawer navigation component
 */
const DrawerMain = props => {
  const theme = useTheme();
  const drawerMainStyles = createDrawerMainStyles(theme);
  const {navigation, state} = props;

  if (!navigation || !state) {
    return null;
  }

  const handleCustomAction = () => {
    navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={[
        drawerMainStyles.container,
        {backgroundColor: theme.colors.surfaceContainerHigh},
      ]}>
      <View
        style={[
          drawerMainStyles.header,
          {borderBottomColor: theme.colors.border},
        ]}>
        <Text variant="titleLarge" style={drawerMainStyles.headerText}>
          Taskiah
        </Text>
      </View>

      <DrawerItemList {...props} />

      {/* <DrawerItem
        label="Custom Action"
        onPress={handleCustomAction}
        activeTintColor={theme.colors.primary}
        inactiveTintColor={theme.colors.onSurface}
      /> */}
    </DrawerContentScrollView>
  );
};

export default DrawerMain;
