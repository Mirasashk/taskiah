import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {
  Card,
  Button,
  TextInput,
  Portal,
  useTheme,
  FAB,
} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import {useRoute, useNavigation} from '@react-navigation/native';
import TaskEditDialog from '../task/TaskEditDialog';
import {AuthContext} from '../../context/AuthContext';
import DateTimePicker from '../common/DateTimePicker';
import TaskDetailField from '../task/TaskDetailField';
import {STATUS_OPTIONS, PRIORITY_OPTIONS} from '../../config/taskConstants';
import {useContext} from 'react';
import {TaskDetailFormStyles} from './styles/TaskDetailFormStyles';

const TaskDetailForm = () => {
  const {updateTask} = useTaskContext();
  const theme = useTheme();
  const {user} = useContext(AuthContext);
  const route = useRoute();
  const navigation = useNavigation();
  const {task} = route.params;
  const styles = TaskDetailFormStyles(theme);

  const [taskState, setTaskState] = useState(task);
  const [showStatus, setShowStatus] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate) : null,
  );

  useEffect(() => {
    setTaskState(task);
  }, [task]);

  useEffect(() => {
    if (dueDate) {
      setTaskState(prev => ({...prev, dueDate: dueDate.toISOString()}));
    }
  }, [dueDate]);

  const handleFieldChange = useCallback((field, value) => {
    setTaskState(prev => ({...prev, [field]: value}));
  }, []);

  const handleUpdate = useCallback(() => {
    updateTask(task.id, taskState);
    navigation.goBack();
  }, [task.id, taskState, updateTask, navigation]);

  const getCategoryOptions = useCallback(
    () =>
      user.categories
        ? Object.values(user.tags).map(category => ({
            label: category.name,
            value: category.name,
          }))
        : [
            {
              label: 'You do not have any categories click here to add one',
              value: 'none',
            },
          ],
    [user.categories, user.tags],
  );

  const getTagOptions = useCallback(
    () =>
      user.tags
        ? Object.values(user.tags).map(tag => ({
            label: tag.name,
            value: tag.name,
          }))
        : [
            {
              label: 'You do not have any tags click here to add one',
              value: 'none',
            },
          ],
    [user.tags],
  );
  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            mode="contained"
            value={taskState.title}
            activeUnderlineColor={theme.colors.primary}
            style={styles.textInput}
            underlineColor={theme.colors.surfaceContainerHigh}
            contentStyle={styles.textInputContent}
            onChangeText={text => handleFieldChange('title', text)}
          />

          <TextInput
            mode="contained"
            value={taskState.description}
            activeUnderlineColor={theme.colors.primary}
            underlineColor={theme.colors.surfaceContainerHigh}
            numberOfLines={10}
            multiline={true}
            contentStyle={styles.textInputContent}
            style={[styles.textInput, {marginBottom: 10}]}
            onChangeText={text => handleFieldChange('description', text)}
            left={
              <TextInput.Icon
                icon="text"
                size={16}
                color={theme.colors.onSurface}
              />
            }
          />

          <View style={{gap: 16, marginBottom: 24}}>
            <TaskDetailField
              label="Status:"
              value={
                taskState.status.charAt(0).toUpperCase() +
                taskState.status.slice(1)
              }
              onPress={() => setShowStatus(true)}
            />
            <TaskDetailField
              label="Priority:"
              value={
                taskState.priority.charAt(0).toUpperCase() +
                taskState.priority.slice(1)
              }
              onPress={() => setShowPriority(true)}
            />
            <TaskDetailField
              label="Category:"
              value={taskState.category || 'Add category'}
              onPress={() => setShowCategory(true)}
              isPrimary={true}
            />
            <TaskDetailField
              label="Tags:"
              value={taskState.tag || 'Add tag'}
              onPress={() => setShowTag(true)}
              isPrimary={true}
            />
            <TaskDetailField
              label="Due Date:"
              value={
                dueDate
                  ? `${dueDate.toLocaleDateString()} at ${dueDate.toLocaleTimeString()}`
                  : 'Set Due Date'
              }
              onPress={() => setShowDueDate(true)}
              icon={{
                source: 'calendar-clock',
                size: 20,
                color: theme.colors.onSurface,
              }}
            />
          </View>

          <Button
            style={styles.updateButton}
            mode="contained"
            onPress={handleUpdate}>
            Update
          </Button>
        </Card.Content>
      </Card>
      <FAB
        style={styles.completeButton}
        icon="check"
        size="small"
        label="Mark Complete"
      />
      {showDueDate && (
        <DateTimePicker
          visible={showDueDate}
          onDismiss={() => setShowDueDate(false)}
          date={dueDate}
          onDateChange={setDueDate}
        />
      )}
      <Portal>
        <TaskEditDialog
          title="Status"
          options={STATUS_OPTIONS}
          onValueChange={value => {
            handleFieldChange('status', value);
            setShowStatus(false);
          }}
          value={taskState.status}
          visible={showStatus}
          onDismiss={() => setShowStatus(false)}
        />

        <TaskEditDialog
          title="Priority"
          options={PRIORITY_OPTIONS}
          onValueChange={value => {
            handleFieldChange('priority', value);
            setShowPriority(false);
          }}
          value={taskState.priority}
          visible={showPriority}
          onDismiss={() => setShowPriority(false)}
        />

        <TaskEditDialog
          title="Tags"
          options={getTagOptions()}
          onValueChange={value => {
            handleFieldChange('tag', value);
            setShowTag(false);
          }}
          value={taskState.tag}
          visible={showTag}
          onDismiss={() => setShowTag(false)}
        />

        <TaskEditDialog
          title="Category"
          options={getCategoryOptions()}
          onValueChange={value => {
            handleFieldChange('category', value);
            setShowCategory(false);
          }}
          value={taskState.category}
          visible={showCategory}
          onDismiss={() => setShowCategory(false)}
        />
      </Portal>
    </View>
  );
};

export default TaskDetailForm;
