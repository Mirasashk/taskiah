import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'themes/app_theme.dart';
import 'providers/theme_provider.dart';
import 'routes/appRoutes.dart';
import 'providers/auth_provider.dart' as auth_provider;

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, child) {
        final authProvider = Provider.of<auth_provider.AuthProvider>(context);
        final user = authProvider.currentUser;
        return MaterialApp(
          title: 'Taskiah',
          theme: AppTheme.lightTheme,
          darkTheme: AppTheme.darkTheme,
          themeMode:
              themeProvider.isDarkMode ? ThemeMode.dark : ThemeMode.light,
          initialRoute: user == null ? AppRoutes.home : AppRoutes.dashboard,
          onGenerateRoute: AppRoutes.generateRoute,
        );
      },
    );
  }
}
