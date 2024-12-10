import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    // Add your initialization logic here
    const timer = setTimeout(() => {
      navigation.replace('Landing');
    }, 2000); // Navigate to Landing after 2 seconds

    return () => clearTimeout(timer);
  }, [navigation]);

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // Add your splash screen styling here
  },
});

export default SplashScreen;
