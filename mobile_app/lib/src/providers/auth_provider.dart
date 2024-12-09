// Create the auth provider
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mobile_app/src/models/user.dart' as user_model;
import 'dart:developer' as developer;
import '../services/api_service.dart' as api_service;
import 'dart:convert';

class AuthProvider with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final _apiService = api_service.ApiService();

  User? authUser;
  User? get currentAuthUser => authUser;

  user_model.User? user;
  user_model.User? get currentUser => user;

  AuthProvider() {
    _auth.authStateChanges().listen((User? authUser) async {
      this.authUser = authUser;
      if (authUser != null) {
        await _fetchUserData(authUser.uid);
      } else {
        user = null;
      }
      notifyListeners();
    });
  }

  Future<void> _fetchUserData(String uid) async {
    try {
      final response = await _apiService.getRequest('/users/$uid');
      user = user_model.User.fromJson(response);
    } catch (e) {
      developer.log('Error fetching user data: $e');
      user = null;
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
      notifyListeners();
    } catch (e) {
      developer.log('Error updating user profile: $e');
      rethrow;
    }
  }

  Future<void> updateEmail(String newEmail) async {
    if (authUser == null) {
      throw Exception('No authenticated user found');
    }

    try {
      // Update email in Firebase Auth
      await authUser!.updateEmail(newEmail);

      // Update email in backend
      await updateUserProfile(extraInfo: {'email': newEmail});

      // Refresh user data
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
    notifyListeners();
  }
}
