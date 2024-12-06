// Create the auth provider
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mobile_app/src/models/user.dart' as user_model;
import 'dart:developer' as developer;

class AuthProvider with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  User? _authUser;
  User? get currentUser => _authUser;

  user_model.User? _user;

  bool get _isLoggedIn => _authUser != null;
  Object? get user => _authUser;
  Object? get userModel => _user;

  AuthProvider() {
    _auth.authStateChanges().listen((User? user) {
      _authUser = user;
      _user = user != null
          ? user_model.User(
              id: user.uid,
              email: user.email ?? '',
              firstName: user.displayName ?? '',
            )
          : null;
      developer.log('User: $_authUser');
      notifyListeners();
    });
  }

  Future<void> signInEmail(String email, String password) async {
    await _auth.signInWithEmailAndPassword(email: email, password: password);
    notifyListeners();
  }

  Future<void> signOut() async {
    await _auth.signOut();
    notifyListeners();
  }
}
