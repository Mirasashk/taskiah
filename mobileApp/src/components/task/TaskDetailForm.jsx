import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {
  Card,
  Button,
  TextInput,
  Portal,
  useTheme,
  Text,
  FAB,
} from 'react-native-paper';
import {useTaskContext} from '../../context/TaskContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import TaskEditDialog from '../task/TaskEditDialog';
import {AuthContext} from '../../context/AuthContext';
import DateTimePicker from '../common/DateTimePicker';
import TaskDetailField from '../task/TaskDetailField';
import {STATUS_OPTIONS, PRIORITY_OPTIONS} from '../../config/taskConstants';
import {useContext} from 'react';
import {TaskDetailFormStyles} from './styles/TaskDetailFormStyles';

const TaskDetailForm = ({mode = 'edit', initialTask = {}}) => {
  const {updateTask, addTask} = useTaskContext();
  const theme = useTheme();
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = TaskDetailFormStyles(theme);
  const route = useRoute();
  const task = route.params?.task;

  const [taskState, setTaskState] = useState(!task ? initialTask : task);

  const [showStatus, setShowStatus] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [dueDate, setDueDate] = useState(() =>
    taskState.dueDate ? new Date(taskState.dueDate) : null,
  );

  const handleFieldChange = useCallback((field, value) => {
    setTaskState(prev => ({...prev, [field]: value}));
  }, []);

  const handleDateChange = useCallback(
    newDate => {
      setDueDate(newDate);
      if (newDate) {
        handleFieldChange('dueDate', newDate.toISOString());
      } else {
        handleFieldChange('dueDate', null);
      }
    },
    [handleFieldChange],
  );

  const handleSubmit = useCallback(async () => {
    try {
      if (mode === 'edit' && task?.id) {
        await updateTask(task.id, taskState);
      } else {
        if (taskState.title) {
          await addTask(taskState);
        } else {
          throw new Error('Task title is required');
        }
      }
      navigation.goBack();
    } catch (error) {
      setErrorText(error.message);
      console.error('Error saving task:', error);
    }
  }, [mode, task?.id, taskState, updateTask, addTask, navigation]);

  const getCategoryOptions = useCallback(
    () =>
      user.categories
        ? Object.values(user.categories).map(category => ({
            label: category.name,
            value: category.name,
          }))
        : [
            {
              label: 'You do not have any categories click here to add one',
              value: 'none',
            },
          ],
    [user.categories],
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

  const getDisplayValue = value => {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  };

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
            placeholder="Task title"
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
            placeholder="Task description"
            left={
              <TextInput.Icon
                icon="text"
                size={16}
                color={theme.colors.onSurface}
              />
            }
          />

          <View style={{gap: 16, marginBottom: 24}}>
            {mode === 'edit' && (
              <TaskDetailField
                label="Status:"
                value={getDisplayValue(taskState.status)}
                onPress={() => setShowStatus(true)}
              />
            )}
            <TaskDetailField
              label="Priority:"
              value={getDisplayValue(taskState.priority)}
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
          {errorText && <Text style={styles.errorText}>{errorText}</Text>}
          <Button
            style={styles.updateButton}
            mode="contained"
            onPress={handleSubmit}>
            {mode === 'edit' ? 'Update' : 'Create'}
          </Button>
        </Card.Content>
      </Card>
      {mode === 'edit' && (
        <FAB
          style={styles.completeButton}
          icon="check"
          size="small"
          label="Mark Complete"
          onPress={() =>
            handleFieldChange('status', 'completed') && handleSubmit()
          }
        />
      )}
      {showDueDate && (
        <DateTimePicker
          visible={showDueDate}
          onDismiss={() => setShowDueDate(false)}
          date={dueDate}
          onDateChange={handleDateChange}
        />
      )}
      <Portal>
        {mode === 'edit' && (
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
        )}

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
