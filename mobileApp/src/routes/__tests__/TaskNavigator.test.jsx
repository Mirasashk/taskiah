import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import TaskNavigator from '../TaskNavigator';

// Mock the screens
jest.mock('../../screens/TasksScreen', () => 'TasksScreen');
jest.mock('../../screens/TaskDetailScreen', () => 'TaskDetailScreen');

describe('TaskNavigator', () => {
  const renderNavigator = () => {
    return render(
      <NavigationContainer>
        <PaperProvider>
          <TaskNavigator />
        </PaperProvider>
      </NavigationContainer>,
    );
  };

  it('renders without crashing', () => {
    const {container} = renderNavigator();
    expect(container).toBeTruthy();
  });

  it('initializes with TasksScreen as default screen', () => {
    const {getByTestId} = renderNavigator();
    // Assuming you've added testID to your screens
    expect(getByTestId('tasks-screen')).toBeTruthy();
  });
});
