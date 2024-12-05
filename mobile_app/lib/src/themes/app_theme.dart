import 'package:flutter/material.dart';

class AppTheme {
  static final ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.blue,
      brightness: Brightness.light,
    ),
    // Add other theme customizations
    cardTheme: const CardTheme(
      elevation: 2,
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    ),
    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
    ),
  );

  static final ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Colors.blue,
      brightness: Brightness.dark,
    ),
    // Dark theme specific customizations
    cardTheme: const CardTheme(
      elevation: 2,
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    ),
    appBarTheme: const AppBarTheme(
      centerTitle: true,
      elevation: 0,
    ),
  );
}
