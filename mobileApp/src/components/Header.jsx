import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {
  Appbar,
  Avatar,
  Text,
  useTheme,
  Portal,
  Modal,
  List,
  Divider,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';

const Header = ({title, openDrawer}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const {user, signOut} = useAuth();

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      hideModal();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <Appbar.Header
        style={[styles.header, {backgroundColor: theme.colors.surface}]}>
        <TouchableOpacity onPress={openDrawer}>
          <Icon name="menu" size={24} color={theme.colors.primary} />
        </TouchableOpacity>

        <Text variant="titleLarge" style={styles.title}>
          {title}
        </Text>

        <TouchableOpacity onPress={showModal}>
          <Avatar.Image
            size={35}
            source={
              user?.photoURL
                ? {uri: user.photoURL}
                : require('../assets/default-avatar.png')
            }
          />
        </TouchableOpacity>
      </Appbar.Header>

      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modal,
            {backgroundColor: theme.colors.surface},
          ]}>
          <View style={styles.modalContent}>
            <View style={styles.userInfo}>
              <Avatar.Image
                size={60}
                source={
                  user?.photoURL
                    ? {uri: user.photoURL}
                    : require('../assets/default-avatar.png')
                }
              />
              <Text variant="titleMedium" style={styles.userName}>
                {user?.displayName || 'User'}
              </Text>
              <Text variant="bodyMedium" style={styles.userEmail}>
                {user?.email}
              </Text>
            </View>

            <Divider />

            <List.Item
              title="Settings"
              left={props => <List.Icon {...props} icon="cog" />}
              onPress={() => {
                hideModal();
                navigation.navigate('Settings');
              }}
            />
            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell" />}
              onPress={() => {
                hideModal();
                navigation.navigate('Notifications');
              }}
            />
            <List.Item
              title="Sign Out"
              left={props => <List.Icon {...props} icon="logout" />}
              onPress={handleSignOut}
            />
          </View>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
  },
  modal: {
    margin: 20,
    borderRadius: 8,
    padding: 0,
    maxWidth: 400,
    alignSelf: 'center',
    width: '90%',
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

export default Header;
