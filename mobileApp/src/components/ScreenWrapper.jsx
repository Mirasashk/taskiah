import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import Header from './Header';

const ScreenWrapper = ({children, title, navigation}) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <Header title={title} openDrawer={() => navigation.openDrawer()} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
