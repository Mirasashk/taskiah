import React from 'react';
import {Card} from 'react-native-paper';
import Modal from 'react-native-modal';
import {useTheme} from 'react-native-paper';
import TaskFilterList from './TaskFilterList';
import {createStyles} from './styles/TaskFilterModal.styles';

const ANIMATION_TIMING = 500;
const SWIPE_THRESHOLD = 200;

/**
 * Modal component for task filtering
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {Function} props.onDismiss - Callback function when modal is dismissed
 */
const TaskFilterModal = ({visible, onDismiss}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const modalProps = {
    isVisible: visible,
    onDismiss,
    animationIn: 'slideInUp',
    animationInTiming: ANIMATION_TIMING,
    animationOut: 'slideOutDown',
    animationOutTiming: ANIMATION_TIMING,
    avoidKeyboard: true,
    swipeDirection: ['down', 'up'],
    swipeThreshold: SWIPE_THRESHOLD,
    coverScreen: false,
    onSwipeComplete: onDismiss,
    onBackdropPress: onDismiss,
    style: styles.modal,
  };

  return (
    <Modal {...modalProps}>
      <Card style={styles.modalContainer}>
        <Card.Title title="Filter" />
        <Card.Content>
          <TaskFilterList onDismiss={onDismiss} />
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default TaskFilterModal;
