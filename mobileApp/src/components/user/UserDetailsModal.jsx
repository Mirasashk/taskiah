import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Modal, Portal, Text, Avatar, useTheme} from 'react-native-paper';

const UserDetailsModal = ({visible, onDismiss, user, listOwner = false}) => {
  const theme = useTheme();

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
              size={80}
              source={
                user?.avatarUrl
                  ? {uri: user.avatarUrl}
                  : require('../../assets/images/default_avatar.png')
              }
            />

            <Text variant="titleMedium" style={styles.userName}>
              {user?.firstName || 'User'} {user?.lastName || ''}
            </Text>
            <Text variant="bodyMedium" style={styles.userEmail}>
              {user?.email}
            </Text>
            {listOwner && (
              <Text variant="bodyLarge" style={styles.userName}>
                List Owner
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 20,
    borderRadius: 8,
    padding: 20,
    maxWidth: 400,
    alignSelf: 'center',
    width: '90%',
  },
  modalContent: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    marginTop: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    marginTop: 4,
    opacity: 0.7,
  },
});

export default UserDetailsModal;
