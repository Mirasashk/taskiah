import 'package:hive_flutter/hive_flutter.dart';
import 'package:mobile_app/src/models/task.dart';
import 'dart:io';

class TestHelper {
  static Future<void> initializeHive() async {
    final tempDir = await Directory.systemTemp.createTemp();
    Hive.init(tempDir.path);
    if (!Hive.isAdapterRegistered(0)) {
      Hive.registerAdapter(TaskAdapter());
    }
  }
}
