import React from 'react';
import {View} from 'react-native';
import {useSplashNavigation} from '../hooks/useSplashNavigation';
import {styles} from './styles/SplashScreen.styles';

/**
 * SplashScreen component that displays during app initialization
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.navigation - Navigation object provided by React Navigation
 * @returns {React.ReactElement} Rendered component
 */
const SplashScreen = ({navigation}) => {
  // Custom hook to handle navigation logic
  useSplashNavigation(navigation);

  return <View style={styles.container} testID="splash-screen" />;
};

export default SplashScreen;
