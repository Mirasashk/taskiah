// Create the routes for the app

import 'package:flutter/material.dart';
import '../screens/dashboard/dashboard_screen.dart';
import '../screens/auth/login_screen.dart';
import '../screens/auth/signup_screen.dart';
import '../screens/landing/home_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';

class AppRoutes {
  static const String dashboard = '/dashboard';
  static const String login = '/login';
  static const String signup = '/signup';
  static const String home = '/';
  static final FirebaseAuth _auth = FirebaseAuth.instance;

  static Route<dynamic> generateRoute(RouteSettings settings) {
    final user = _auth.currentUser;

    switch (settings.name) {
      case dashboard:
        if (user == null) {
          return MaterialPageRoute(builder: (_) => HomeScreen());
        }
        return MaterialPageRoute(builder: (_) => DashboardScreen());
      case login:
        if (user != null) {
          return MaterialPageRoute(builder: (_) => DashboardScreen());
        }
        return MaterialPageRoute(builder: (_) => LoginScreen());
      case signup:
        if (user != null) {
          return MaterialPageRoute(builder: (_) => DashboardScreen());
        }
        return MaterialPageRoute(builder: (_) => SignupScreen());
      default:
        if (user != null) {
          return MaterialPageRoute(builder: (_) => DashboardScreen());
        }
        return MaterialPageRoute(builder: (_) => HomeScreen());
    }
  }
}
