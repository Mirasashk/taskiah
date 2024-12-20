import React from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import {drawerStyles} from './styles';

/**
 * Main drawer navigation component
 * @param {Object} props - Navigation props from React Navigation
 * @returns {React.ReactElement} Drawer navigation component
 */
const DrawerMain = props => {
  const theme = useTheme();
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
        drawerStyles.container,
        {backgroundColor: theme.colors.background},
      ]}>
      <View
        style={[drawerStyles.header, {borderBottomColor: theme.colors.border}]}>
        <Text style={[drawerStyles.headerText, {color: theme.colors.text}]}>
          App Name
        </Text>
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Custom Action"
        onPress={handleCustomAction}
        activeTintColor={theme.colors.primary}
        inactiveTintColor={theme.colors.onSurface}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerMain;
