import React, {useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Appbar, Avatar, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../context/AuthContext';
import ProfileModal from './ProfileModal';
import {ThemeContext} from '../../context/ThemeContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import {STACK_SCREENS} from '../../routes/PrivateStack';
import {DrawerActions} from '@react-navigation/native';

/**
 * @typedef {Object} HeaderProps
 * @property {string} title - The title to display in the header
 */

/**
 * Header component that displays the app bar with navigation menu, title, and user profile
 * @param {HeaderProps} props - The component props
 * @returns {JSX.Element} The Header component
 */
const Header = ({title, onMenuPress}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useTheme();
  const {toggleTheme} = useContext(ThemeContext);
  const {user, signOut, image} = useAuth();
  const navigation = useNavigation();
  const route = useRoute();

  const handleMenuPress = () => {
    if (route.name === STACK_SCREENS.SETTINGS) {
      navigation.goBack();
    } else {
      onMenuPress?.();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <Appbar.Header
        style={[
          styles.header,
          {backgroundColor: theme.colors.surfaceContainerHigh},
        ]}>
        <TouchableOpacity onPress={handleMenuPress}>
          <Icon
            name={route.name === STACK_SCREENS.SETTINGS ? 'arrow-left' : 'menu'}
            size={24}
            color={theme.colors.onSurface}
          />
        </TouchableOpacity>

        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>

        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Avatar.Image
            size={35}
            source={
              image
                ? {uri: image}
                : require('../../assets/images/default_avatar.png')
            }
          />
        </TouchableOpacity>
      </Appbar.Header>

      <ProfileModal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        user={user}
        onSignOut={handleSignOut}
        onThemeToggle={toggleTheme}
        theme={theme}
        image={image}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
  },
});

export default Header;
