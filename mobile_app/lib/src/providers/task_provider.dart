import 'package:flutter/material.dart';

import '../services/api_service.dart' as api_service;
import '../models/task.dart' as task_model;

class TaskProvider with ChangeNotifier {
  final _apiService = api_service.ApiService();
  late final String? userId;
  List<task_model.Task> tasks = [];
  List<task_model.Task> get currentTasks => tasks;

  TaskProvider() {
    getTasks();
  }

  Future<void> getTasks() async {
    final tasks = await _apiService.getRequest('api/tasks/');
    this.tasks = tasks.map((task) => task_model.Task.fromJson(task)).toList();
    notifyListeners();
  }

  Future<void> addTask(task_model.Task task) async {
    final newTask = await _apiService.postRequest('api/tasks', task.toJson());
    tasks.add(task_model.Task.fromJson(newTask));
    notifyListeners();
  }
}
