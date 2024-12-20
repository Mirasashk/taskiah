/**
 * @component HeroSection
 * @description Hero section component for the landing screen
 * @param {Object} props
 * @param {Object} props.theme - Current theme object
 * @returns {React.ReactElement}
 */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const HeroSection = ({theme}) => (
  <View style={styles.container}>
    <View style={styles.graphicContainer}>
      <Image
        source={require('../../assets/images/heroImg.png')}
        style={styles.graphic}
      />
    </View>
    <Text style={[styles.title, {color: theme.colors.onBackground}]}>
      Organize Your Tasks
    </Text>
    <Text style={[styles.subtitle, {color: theme.colors.onBackground}]}>
      Stay productive and manage your tasks efficiently with Taskiah
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  graphicContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
  },
  graphic: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default HeroSection;
