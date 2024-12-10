// Create the auth provider
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mobile_app/src/models/user.dart' as user_model;
import 'dart:developer' as developer;
import '../services/api_service.dart' as api_service;

class AuthProvider with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final _apiService = api_service.ApiService();

  User? authUser;
  user_model.User? user;

  // Simplified getters by removing redundant naming
  User? get currentAuthUser => authUser;
  user_model.User? get currentUser => user;

  AuthProvider() {
    _auth.authStateChanges().listen(_handleAuthStateChange);
  }

  // Extracted auth state change logic to separate method
  Future<void> _handleAuthStateChange(User? newAuthUser) async {
    final newUid = newAuthUser?.uid;
    if (newAuthUser != null) {
      try {
        authUser = newAuthUser;
        await _fetchUserData(newUid!);
        notifyListeners();
      } catch (e) {
        developer.log('Error fetching user data: $e');
        if (_isAuthError(e.toString())) {
          developer.log('Authentication error, signing out user');
          _clearUserData();
          await _auth.signOut();
          notifyListeners();
        }
      }
    } else if (authUser != null || user != null) {
      _clearUserData();
      notifyListeners();
    }
  }

  // Helper methods for cleaner code
  void _clearUserData() {
    authUser = null;
    user = null;
  }

  bool _isAuthError(String error) {
    const authErrors = ['401', '403', '404', '500'];
    return authErrors.any((code) => error.contains(code));
  }

  Future<void> _fetchUserData(String uid) async {
    try {
      final response = await _apiService.getRequest('api/users/$uid');
      if (response == null) {
        throw Exception('Received null response from API');
      }

      user = user_model.User.fromJson(response);
      if (user == null) {
        throw Exception('Received null user from API');
      }
    } catch (e, stackTrace) {
      developer.log('Error fetching user data: $e');
      developer.log('Stack trace: $stackTrace');
      rethrow;
    }
  }

  Future<void> updateUserProfile({
    String? firstName,
    String? lastName,
    String? photoUrl,
    Map<String, dynamic>? extraInfo,
  }) async {
    if (user == null || authUser == null) {
      throw Exception('No authenticated user found');
    }

    try {
      // Create update data map with only non-null values
      final Map<String, dynamic> updateData = {
        if (firstName != null) 'firstName': firstName,
        if (lastName != null) 'lastName': lastName,
        if (photoUrl != null) 'photoURL': photoUrl,
        if (extraInfo != null) 'extraInfo': extraInfo,
      };

      // Update user data in backend
      final response = await _apiService.putRequest(
        '/users/${user!.id}',
        updateData,
      );
      // Update local user object
      user = user_model.User.fromJson(response);
    } catch (e) {
      developer.log('Error updating user profile: $e');
      rethrow;
    }
  }

  Future<void> updateEmail(String newEmail) async {
    if (authUser == null) throw Exception('No authenticated user found');

    try {
      await authUser!.verifyBeforeUpdateEmail(newEmail);
      await updateUserProfile(extraInfo: {'email': newEmail});
      await _fetchUserData(authUser!.uid);
      notifyListeners();
    } catch (e) {
      developer.log('Error updating email: $e');
      rethrow;
    }
  }

  Future<void> signInEmail(String email, String password) async {
    try {
      await _auth.signInWithEmailAndPassword(email: email, password: password);
    } catch (e, stackTrace) {
      developer.log('Error during sign in: $e');
      developer.log('Stack trace: $stackTrace');
      rethrow;
    }
  }

  Future<void> signOut() async {
    await _auth.signOut();
    developer.log('User signed out');
    user = null;
    authUser = null;
    notifyListeners();
  }
}
