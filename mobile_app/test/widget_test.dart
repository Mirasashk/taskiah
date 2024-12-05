// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_app/src/app.dart';
import 'package:provider/provider.dart';
import 'package:mobile_app/src/providers/theme_provider.dart';
import 'helpers/test_helper.dart';
import 'package:hive_flutter/hive_flutter.dart';

void main() {
  setUpAll(() async {
    await TestHelper.initializeHive();
  });

  testWidgets('App initialization test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (_) => ThemeProvider(),
        child: const App(),
      ),
    );

    // Wait for async operations to complete
    await tester.pumpAndSettle();

    // Verify that the app shows the Tasks title
    expect(find.text('Tasks'), findsOneWidget);
    
    // Verify that the settings icon is present
    expect(find.byIcon(Icons.settings), findsOneWidget);
    
    // Verify that the add task button is present
    expect(find.byIcon(Icons.add), findsOneWidget);
  });

  tearDownAll(() async {
    await Hive.deleteFromDisk();
  });
}
