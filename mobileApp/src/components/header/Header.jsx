import React, {useState, useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Appbar, Avatar, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../context/AuthContext';
import ProfileModal from './ProfileModal';
import {ThemeContext} from '../../context/ThemeContext';

/**
 * @typedef {Object} HeaderProps
 * @property {string} title - The title to display in the header
 * @property {() => void} openDrawer - Function to open the navigation drawer
 */

/**
 * Header component that displays the app bar with navigation menu, title, and user profile
 * @param {HeaderProps} props - The component props
 * @returns {JSX.Element} The Header component
 */
const Header = ({title, openDrawer}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useTheme();
  const {toggleTheme} = useContext(ThemeContext);
  const {user, signOut} = useAuth();

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
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="menu" size={24} color={theme.colors.onSurface} />
        </TouchableOpacity>

        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>

        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Avatar.Image
            size={35}
            source={
              user?.photoURL
                ? {uri: user.photoURL}
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
