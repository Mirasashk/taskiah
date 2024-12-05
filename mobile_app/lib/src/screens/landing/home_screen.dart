import 'package:flutter/material.dart';
import '../../services/task_service.dart';
import '../../models/task.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TaskService _taskService = TaskService();
  late List<Task> _tasks = [];

  @override
  void initState() {
    super.initState();
    _initializeTaskService();
  }

  Future<void> _initializeTaskService() async {
    await _taskService.init();
    setState(() {
      _tasks = _taskService.getAllTasks();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tasks'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {
              // Navigate to settings screen
              // TODO: Implement settings screen
            },
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: _tasks.length,
        itemBuilder: (context, index) {
          final task = _tasks[index];
          return ListTile(
            title: Text(task.title),
            leading: Checkbox(
              value: task.isCompleted,
              onChanged: (bool? value) {
                setState(() {
                  task.isCompleted = value ?? false;
                  _taskService.updateTask(index, task);
                });
              },
            ),
            trailing: IconButton(
              icon: const Icon(Icons.delete),
              onPressed: () {
                _taskService.deleteTask(index);
                setState(() {
                  _tasks.removeAt(index);
                });
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Show add task dialog
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
