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
      developer.log('Auth state changed: ${authUser?.uid}');
      if (authUser != null) {
        try {
          this.authUser = authUser;
          await _fetchUserData(authUser.uid);
          notifyListeners();
        } catch (e) {
          developer.log('Error fetching user data: $e');
          // Only sign out if it's a critical error
          if (e.toString().contains('401') ||
              e.toString().contains('403') ||
              e.toString().contains('404') ||
              e.toString().contains('500')) {
            developer.log('Authentication error, signing out user');
            user = null;
            await _auth.signOut();
          } else {
            // For other errors, we might want to retry or handle differently
            developer.log('Non-critical error, keeping user signed in');
          }
          notifyListeners();
        }
      } else {
        user = null;
        notifyListeners();
      }
    });
  }

  Future<void> _fetchUserData(String uid) async {
    try {
      developer.log('Fetching user data for UID: $uid');
      final response = await _apiService.getRequest('api/users/$uid');
      if (response == null) {
        throw Exception('Received null response from API');
      }
      developer.log('Received user data: $response');
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
    developer.log('User signed out');
    user = null;
    authUser = null;
    notifyListeners();
  }
}
