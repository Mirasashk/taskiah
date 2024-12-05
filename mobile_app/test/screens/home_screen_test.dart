import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mobile_app/src/screens/landing/home_screen.dart';
import 'package:hive_flutter/hive_flutter.dart';
import '../helpers/test_helper.dart';

void main() {
  setUpAll(() async {
    await TestHelper.initializeHive();
  });

  testWidgets('HomeScreen should render properly', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: HomeScreen()));
    await tester.pumpAndSettle();

    // Verify basic UI elements
    expect(find.text('Tasks'), findsOneWidget);
    expect(find.byIcon(Icons.settings), findsOneWidget);
    expect(find.byIcon(Icons.add), findsOneWidget);
  });

  testWidgets('HomeScreen should show empty state initially',
      (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: HomeScreen()));
    await tester.pumpAndSettle();

    // Initially there should be no tasks
    expect(find.byType(ListTile), findsNothing);
  });

  tearDownAll(() async {
    await Hive.deleteFromDisk();
  });
}
