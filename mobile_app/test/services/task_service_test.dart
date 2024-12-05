import 'package:flutter_test/flutter_test.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:mobile_app/src/models/task.dart';
import 'package:mobile_app/src/services/task_service.dart';
import '../helpers/test_helper.dart';

void main() {
  group('TaskService Tests', () {
    late TaskService taskService;
    late Box<Task> box;

    setUp(() async {
      await TestHelper.initializeHive();
      box = await Hive.openBox<Task>('tasks_test');
      taskService = TaskService();
      await taskService.init();
      // Clear any existing data
      await taskService.clearAll();
    });

    tearDown(() async {
      if (box.isOpen) {
        await box.clear();
        await box.close();
      }
    });

    test('addTask should add a task to the box', () async {
      final task = Task(title: 'Test Task');
      await taskService.addTask(task);

      final tasks = taskService.getAllTasks();
      expect(tasks.length, 1);
      expect(tasks.first.title, 'Test Task');
    });

    test('deleteTask should remove task from the box', () async {
      // Add a task first
      final task = Task(title: 'Test Task');
      await taskService.addTask(task);

      // Verify task was added
      var tasks = taskService.getAllTasks();
      expect(tasks.length, 1);

      // Delete the task
      await taskService.deleteTask(0);

      // Verify task was deleted
      tasks = taskService.getAllTasks();
      expect(tasks.isEmpty, true,
          reason: 'Task list should be empty after deletion');
    });

    test('updateTask should modify existing task', () async {
      // Add initial task
      final task = Task(title: 'Test Task');
      await taskService.addTask(task);

      // Update the task
      final updatedTask = Task(title: 'Updated Task');
      await taskService.updateTask(0, updatedTask);

      // Verify the update
      final tasks = taskService.getAllTasks();
      expect(tasks.first.title, 'Updated Task');
    });

    test('getAllTasks should return empty list when no tasks exist', () async {
      final tasks = taskService.getAllTasks();
      expect(tasks.isEmpty, true);
    });
  });
}
