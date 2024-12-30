import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Modal, Portal, List, Divider, Avatar, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {STACK_SCREENS} from '../../routes/PrivateStack';

/**
 * @typedef {Object} User
 * @property {string} [photoURL] - URL of the user's profile photo
 * @property {string} [username] - User's display name
 * @property {string} [email] - User's email address
 */

/**
 * @typedef {Object} Theme
 * @property {Object} colors - Theme colors object
 * @property {string} colors.surfaceContainerHigh - Background color for elevated surfaces
 */

/**
 * @typedef {Object} ProfileModalProps
 * @property {boolean} visible - Whether the modal is visible
 * @property {() => void} onDismiss - Function to call when the modal is dismissed
 * @property {User} user - User object containing profile information
 * @property {() => void} onSignOut - Function to handle sign out
 * @property {() => void} onThemeToggle - Function to toggle between light and dark theme
 * @property {Theme} theme - Theme object containing color information
 */

/**
 * Modal component that displays user profile information and settings
 * @param {ProfileModalProps} props - The component props
 * @returns {JSX.Element} The ProfileModal component
 */
const ProfileModal = ({
  visible,
  onDismiss,
  user,
  onSignOut,
  onThemeToggle,
  theme,
  image,
}) => {
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    onDismiss();
    // Try direct navigation first
    navigation.navigate(STACK_SCREENS.SETTINGS);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.modal,
          {backgroundColor: theme.colors.surfaceContainerHigh},
        ]}>
        <View style={styles.modalContent}>
          <View style={styles.userInfo}>
            <Avatar.Image
              size={60}
              source={
                image
                  ? {uri: image}
                  : require('../../assets/images/default_avatar.png')
              }
            />
            <Text variant="titleMedium" style={styles.userName}>
              {user?.username || 'User'}
            </Text>
            <Text variant="bodyMedium" style={styles.userEmail}>
              {user?.email}
            </Text>
          </View>

          <Divider />

          <List.Item
            title="Theme"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            onPress={onThemeToggle}
          />

          <List.Item
            title="Settings"
            left={props => <List.Icon {...props} icon="cog" />}
            onPress={handleSettingsPress}
          />
          <List.Item
            title="Notifications"
            left={props => <List.Icon {...props} icon="bell" />}
            onPress={() => {
              onDismiss();
              navigation.navigate('Dashboard');
            }}
          />
          <List.Item
            title="Sign Out"
            left={props => <List.Icon {...props} icon="logout" />}
            onPress={onSignOut}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    borderRadius: 8,
    padding: 0,
    maxWidth: 400,
    alignSelf: 'center',
    width: '90%',
    bottom: 200,
  },
  modalContent: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  userInfo: {
    padding: 20,
    alignItems: 'center',
  },
  userName: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  userEmail: {
    marginTop: 4,
    opacity: 0.7,
  },
});

export default ProfileModal;
