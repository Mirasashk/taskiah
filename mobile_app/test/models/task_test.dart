import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_app/src/models/task.dart';

void main() {
  group('Task Model Tests', () {
    test('Task should be created with default values', () {
      final task = Task(title: 'Test Task');

      expect(task.title, 'Test Task');
      expect(task.isCompleted, false);
      expect(task.createdAt.day, DateTime.now().day);
    });

    test('Task should be created with custom values', () {
      final customDate = DateTime(2024, 1, 1);
      final task = Task(
        title: 'Test Task',
        isCompleted: true,
        createdAt: customDate,
      );

      expect(task.title, 'Test Task');
      expect(task.isCompleted, true);
      expect(task.createdAt, customDate);
    });
  });
}
