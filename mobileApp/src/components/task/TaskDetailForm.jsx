import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import {
  Card,
  Button,
  IconButton,
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
import {LoadingView} from '../common/LoadingView';

const TaskDetailForm = ({
  mode = 'edit',
  initialTask = {},
  listId,
  task: propTask,
  onClose,
}) => {
  const {updateTask, addTaskToFirestore, loading} = useTaskContext();
  const theme = useTheme();
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const styles = TaskDetailFormStyles(theme);
  const route = useRoute();
  const routeTask = route.params?.task;

  const [taskState, setTaskState] = useState(() => {
    if (mode === 'edit') {
      return propTask || routeTask || initialTask;
    }
    return initialTask;
  });

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
      if (!taskState.title?.trim()) {
        setErrorText('Task title is required');
        return;
      }

      if (mode === 'edit' && taskState.id) {
        await updateTask(taskState.id, taskState);
      } else {
        await addTaskToFirestore(taskState);
      }
      onClose();
    } catch (error) {
      setErrorText(error.message);
      console.error('Error saving task:', error);
    }
  }, [mode, taskState, updateTask, addTaskToFirestore, navigation]);

  //   const getCategoryOptions = useCallback(
  //     () =>
  //       user.categories
  //         ? Object.values(user.categories).map(category => ({
  //             label: category.name,
  //             value: category.name,
  //           }))
  //         : [
  //             {
  //               label: 'You do not have any categories click here to add one',
  //               value: 'none',
  //             },
  //           ],
  //     [user.categories],
  //   );

  //   const getTagOptions = useCallback(
  //     () =>
  //       user.tags
  //         ? Object.values(user.tags).map(tag => ({
  //             label: tag.name,
  //             value: tag.name,
  //           }))
  //         : [
  //             {
  //               label: 'You do not have any tags click here to add one',
  //               value: 'none',
  //             },
  //           ],
  //     [user.tags],
  //   );

  const getDisplayValue = value => {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  };

  if (loading) {
    return <LoadingView />;
  }

  return (
    <View>
      <TextInput
        mode="contained"
        value={taskState.title}
        activeUnderlineColor={theme.colors.primary}
        style={styles.textInput}
        multiline={true}
        underlineColor={theme.colors.surfaceContainerHigh}
        contentStyle={styles.textInputContent}
        onChangeText={text => handleFieldChange('title', text)}
        placeholder="Task title"
        autoFocus={mode === 'create'}
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
        <View style={{flexDirection: 'row'}}>
          <TaskDetailField
            label="Priority:"
            value={getDisplayValue(taskState.priority)}
            onPress={() => setShowPriority(true)}
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
        {/* <TaskDetailField
              label="Category:"
              value={taskState.category || 'Add category'}
              onPress={() => setShowCategory(true)}
              isPrimary={true}
            /> */}
        {/* <TaskDetailField
              label="Tags:"
              value={taskState.tag || 'Add tag'}
              onPress={() => setShowTag(true)}
              isPrimary={true}
            /> */}
      </View>
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          alignItems: 'center',
          width: '100%',
          justifyContent: 'center',
        }}>
        <Button
          style={[styles.updateButton, {width: '40%'}]}
          mode="contained"
          onPress={handleSubmit}>
          {mode === 'edit' ? 'Update' : 'Create'}
        </Button>
        {mode === 'edit' && (
          <Button
            style={[
              styles.updateButton,
              {width: '40%', backgroundColor: theme.colors.secondary},
            ]}
            mode="contained"
            icon="check"
            contentStyle={{flexDirection: 'row-reverse'}}
            onPress={() => {
              handleFieldChange('status', 'completed');
              handleSubmit();
            }}>
            Mark Complete
          </Button>
        )}
      </View>
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

        {/* <TaskEditDialog
          title="Tags"
          options={getTagOptions()}
          onValueChange={value => {
            handleFieldChange('tag', value);
            setShowTag(false);
          }}
          value={taskState.tag}
          visible={showTag}
          onDismiss={() => setShowTag(false)}
        /> */}

        {/* <TaskEditDialog
          title="Category"
          options={getCategoryOptions()}
          onValueChange={value => {
            handleFieldChange('category', value);
            setShowCategory(false);
          }}
          value={taskState.category}
          visible={showCategory}
          onDismiss={() => setShowCategory(false)}
        /> */}
      </Portal>
    </View>
  );
};

export default TaskDetailForm;
