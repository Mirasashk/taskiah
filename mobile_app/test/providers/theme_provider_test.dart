import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_app/src/providers/theme_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  group('ThemeProvider Tests', () {
    late ThemeProvider themeProvider;

    setUp(() async {
      SharedPreferences.setMockInitialValues({});
      await SharedPreferences.getInstance();

      themeProvider = ThemeProvider();
      await Future.delayed(const Duration(milliseconds: 100));
    });

    test('initial theme should be light', () async {
      expect(themeProvider.isDarkMode, false);
    });

    test('toggleTheme should switch between light and dark mode', () async {
      expect(themeProvider.isDarkMode, false);

      await themeProvider.toggleTheme();
      expect(themeProvider.isDarkMode, true);

      await themeProvider.toggleTheme();
      expect(themeProvider.isDarkMode, false);
    });
  });
}
