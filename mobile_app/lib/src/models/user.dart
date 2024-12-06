// Create a user model to represent the user data
class User {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String photoUrl;
  final String role;
  final Map<String, dynamic> tags;
  final DateTime createdAt;
  final bool isActive;
  final String username;
  final DateTime updatedAt;
  final Map<String, dynamic> extraInfo;

  User({
    required this.id,
    required this.email,
    required this.firstName,
    this.lastName = '',
    this.photoUrl = '',
    this.role = '',
    this.tags = const {},
    DateTime? createdAt,
    this.isActive = true,
    this.username = '',
    DateTime? updatedAt,
    this.extraInfo = const {},
  })  : createdAt = createdAt ?? DateTime.now(),
        updatedAt = updatedAt ?? DateTime.now();

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'first_name': firstName,
      'last_name': lastName,
      'photo_url': photoUrl,
      'role': role,
      'tags': tags,
      'created_at': createdAt,
      'is_active': isActive,
      'username': username,
      'extra_info': extraInfo,
    };
  }

  @override
  String toString() {
    return 'User(id: $id, email: $email, firstName: $firstName, lastName: $lastName, photoUrl: $photoUrl, role: $role, tags: $tags, createdAt: $createdAt, isActive: $isActive, username: $username, extraInfo: $extraInfo)';
  }

  @override
  bool operator ==(Object other) {
    return other is User && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  static User? fromJson(Map<String, dynamic> json) {
    return User.fromJson(json);
  }
}
