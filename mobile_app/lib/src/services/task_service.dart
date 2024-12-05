import 'package:hive_flutter/hive_flutter.dart';
import '../models/task.dart';

class TaskService {
  static const String _boxName = 'tasks';
  late Box<Task> _taskBox;

  Future<void> init() async {
    if (!Hive.isBoxOpen(_boxName)) {
      _taskBox = await Hive.openBox<Task>(_boxName);
    } else {
      _taskBox = Hive.box<Task>(_boxName);
    }
  }

  Future<void> addTask(Task task) async {
    await _taskBox.add(task);
  }

  Future<void> updateTask(int index, Task task) async {
    if (index >= 0 && index < _taskBox.length) {
      await _taskBox.putAt(index, task);
    }
  }

  Future<void> deleteTask(int index) async {
    if (index >= 0 && index < _taskBox.length) {
      await _taskBox.deleteAt(index);
    }
  }

  List<Task> getAllTasks() {
    return _taskBox.values.toList();
  }

  Future<void> dispose() async {
    if (_taskBox.isOpen) {
      await _taskBox.close();
    }
  }

  Future<void> clearAll() async {
    await _taskBox.clear();
  }
}
