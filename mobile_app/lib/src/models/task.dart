import 'package:hive/hive.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'dart:core';

part 'task.g.dart';

@HiveType(typeId: 0)
class Task extends HiveObject {
  @HiveField(0)
  String category;
  @HiveField(1)
  DateTime createdAt;
  @HiveField(2)
  String description;
  @HiveField(3)
  DateTime dueDate;
  @HiveField(4)
  String id;
  @HiveField(5)
  Map<String, dynamic> notifications;
  @HiveField(6)
  String OwnerId;
  @HiveField(7)
  Map<String, dynamic> permissions;
  @HiveField(8)
  String priority;
  @HiveField(9)
  List<Map<String, dynamic>> sharedWith;
  @HiveField(10)
  String status;
  @HiveField(11)
  String tags;
  @HiveField(12)
  String title;
  @HiveField(13)
  DateTime updatedAt;

  Task({
    this.category = '',
    required DateTime? createdAt,
    this.description = '',
    DateTime? dueDate,
    required this.id,
    this.notifications = const {},
    required this.OwnerId,
    this.permissions = const {},
    this.priority = '',
    this.sharedWith = const [],
    this.status = '',
    this.tags = '',
    required this.title,
    DateTime? updatedAt,
  })  : createdAt = createdAt ?? DateTime.now(),
        dueDate = dueDate ?? DateTime.now(),
        updatedAt = updatedAt ?? DateTime.now();

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      category: json['category'],
      createdAt: DateTime.parse(json['createdAt']),
      description: json['description'],
      dueDate: DateTime.parse(json['dueDate']),
      id: json['id'],
      notifications: json['notifications'],
      OwnerId: json['OwnerId'],
      permissions: json['permissions'],
      priority: json['priority'],
      sharedWith: json['sharedWith'],
      status: json['status'],
      tags: json['tags'],
      title: json['title'],
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'category': category,
      'createdAt': createdAt.toIso8601String(),
      'description': description,
      'dueDate': dueDate.toIso8601String(),
      'id': id,
      'notifications': notifications,
      'OwnerId': OwnerId,
      'permissions': permissions,
      'priority': priority,
      'sharedWith': sharedWith,
      'status': status,
      'tags': tags,
      'title': title,
      'updatedAt': updatedAt.toIso8601String(),
    };
  }

  @override
  String toString() {
    return 'Task(id: $id, title: $title, description: $description, dueDate: $dueDate, createdAt: $createdAt, updatedAt: $updatedAt, category: $category, status: $status, priority: $priority, tags: $tags, notifications: $notifications, OwnerId: $OwnerId, permissions: $permissions, sharedWith: $sharedWith)';
  }

  @override
  bool operator ==(Object other) {
    return other is Task && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;
}

DateTime parseTimestamp(Map<String, dynamic> timestamp) {
  return DateTime.fromMillisecondsSinceEpoch(
    timestamp['_seconds'] * 1000 + timestamp['_nanoseconds'] ~/ 1000000,
  );
}
