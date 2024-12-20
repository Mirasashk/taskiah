/**
 * @component Logo
 * @description Displays the app logo based on current theme
 * @param {Object} props
 * @param {boolean} props.isDark - Current theme state
 * @returns {React.ReactElement}
 */
import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const Logo = ({isDark}) => (
  <View style={styles.container}>
    <Image
      source={
        isDark
          ? require('../../assets/images/Logo_white.png')
          : require('../../assets/images/Logo_black.png')
      }
      style={styles.image}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingBottom: 20,
  },
  image: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Logo;
