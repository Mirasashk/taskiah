// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class TaskAdapter extends TypeAdapter<Task> {
  @override
  final int typeId = 0;

  @override
  Task read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return Task(
      category: fields[0] as String,
      createdAt: fields[1] as DateTime?,
      description: fields[2] as String,
      dueDate: fields[3] as DateTime?,
      id: fields[4] as String,
      notifications: (fields[5] as Map).cast<String, dynamic>(),
      OwnerId: fields[6] as String,
      permissions: (fields[7] as Map).cast<String, dynamic>(),
      priority: fields[8] as String,
      sharedWith: (fields[9] as List)
          .map((dynamic e) => (e as Map).cast<String, dynamic>())
          .toList(),
      status: fields[10] as String,
      tags: fields[11] as String,
      title: fields[12] as String,
      updatedAt: fields[13] as DateTime?,
    );
  }

  @override
  void write(BinaryWriter writer, Task obj) {
    writer
      ..writeByte(14)
      ..writeByte(0)
      ..write(obj.category)
      ..writeByte(1)
      ..write(obj.createdAt)
      ..writeByte(2)
      ..write(obj.description)
      ..writeByte(3)
      ..write(obj.dueDate)
      ..writeByte(4)
      ..write(obj.id)
      ..writeByte(5)
      ..write(obj.notifications)
      ..writeByte(6)
      ..write(obj.OwnerId)
      ..writeByte(7)
      ..write(obj.permissions)
      ..writeByte(8)
      ..write(obj.priority)
      ..writeByte(9)
      ..write(obj.sharedWith)
      ..writeByte(10)
      ..write(obj.status)
      ..writeByte(11)
      ..write(obj.tags)
      ..writeByte(12)
      ..write(obj.title)
      ..writeByte(13)
      ..write(obj.updatedAt);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is TaskAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}
