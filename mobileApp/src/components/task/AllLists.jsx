import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Text, Card, useTheme, Avatar, FAB} from 'react-native-paper';
import {useAuth} from '../../context/AuthContext';
import {useListContext} from '../../context/ListContext';
import {useUserContext} from '../../context/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import UserDetailsModal from '../user/UserDetailsModal';
import {useNavigation} from '@react-navigation/native';

export const AllLists = () => {
  const {lists, myLists, sharedLists} = useListContext();
  const {relationships} = useUserContext();
  const theme = useTheme();
  const {user} = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [listOwner, setListOwner] = useState(false);
  const navigation = useNavigation();

  const renderChevron = React.useCallback(
    () => (
      <View style={{paddingRight: 10, paddingBottom: 10}}>
        <Icon name="dots-horizontal" size={24} color={theme.colors.onSurface} />
      </View>
    ),
    [theme.colors.onSurface],
  );

  const renderCard = React.useCallback(
    ({list, owner}) => (
      <TouchableOpacity
        key={list.id}
        onPress={() => {
          navigation.navigate(list.name.slice(0, 30));
        }}>
        <Card style={{backgroundColor: theme.colors.surface}}>
          <Card.Title
            title={list.name}
            right={renderChevron}
            style={{minHeight: 50}}
          />
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 16,
              }}>
              <Text variant="bodyMedium">{list.tasks.length} tasks</Text>
              <Text variant="bodyMedium">
                {list.tasks.filter(task => task.completed).length} completed
              </Text>
              <Text variant="bodyMedium">
                {
                  list.tasks.filter(
                    task =>
                      task.dueDate === new Date().toISOString().split('T')[0],
                  ).length
                }{' '}
                due today
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {owner && list.sharedWith.length > 0 ? (
                <Text style={{paddingTop: 12}} variant="bodyMedium">
                  {list.sharedWith.map(userId =>
                    renderUserAvatar({userId, list}),
                  )}
                </Text>
              ) : null}

              {!owner && list.ownerId ? (
                <Text style={{paddingTop: 12}} variant="bodyMedium">
                  {renderUserAvatar({
                    userId: relationships.find(
                      relationship => relationship.userId === list.ownerId,
                    ).userId,
                    list,
                  })}
                </Text>
              ) : null}
              {!owner && list.sharedWith.length > 1 ? (
                <Text style={{paddingTop: 12}} variant="bodyMedium">
                  {list.sharedWith.map(userId =>
                    userId != user.id
                      ? renderUserAvatar({
                          userId: relationships.find(
                            relationship => relationship.userId === userId,
                          ).userId,
                          list,
                        })
                      : null,
                  )}
                </Text>
              ) : null}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    ),
    [theme.colors.surface, renderChevron],
  );

  const renderUserAvatar = React.useCallback(
    ({userId, list}) => {
      const userRelationship = relationships.find(
        relationship => relationship.userId === userId,
      );

      return (
        <View key={userId} style={{paddingRight: 8}}>
          <TouchableOpacity
            onPress={() => {
              setSelectedUser(userRelationship.userData);
              setListOwner(list.ownerId === userId);
              setModalVisible(true);
            }}>
            <Avatar.Image
              size={32}
              source={{
                uri: userRelationship?.userData?.avatarUrl,
              }}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [relationships],
  );

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: theme.colors.surfaceContainerHigh,
          height: '100%',
        }}>
        <View
          style={{
            padding: 20,
            gap: 8,
          }}>
          <Text>My Lists</Text>
          {myLists.map(list => renderCard({list, owner: true}))}
          <Text>Shared Lists</Text>
          {sharedLists.map(list => renderCard({list, owner: false}))}
        </View>
      </ScrollView>
      {/* <FAB
        icon="plus"
        color={theme.colors.onPrimary}
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: theme.colors.primary,
        }}
        onPress={() => {
          navigation.navigate('TaskAddNew');
        }}
      /> */}

      <UserDetailsModal
        visible={modalVisible}
        onDismiss={() => {
          setModalVisible(false);
          setSelectedUser(null);
          setListOwner(false);
        }}
        user={selectedUser}
        listOwner={listOwner}
      />
    </>
  );
};
