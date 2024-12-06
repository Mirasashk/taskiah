import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../routes/appRoutes.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  DashboardScreenState createState() => DashboardScreenState();
}

class DashboardScreenState extends State<DashboardScreen> {
  late AuthProvider authProvider;

  @override
  void initState() {
    super.initState();
    authProvider = Provider.of<AuthProvider>(context, listen: false);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Dashboard'),
        ElevatedButton(
          onPressed: () async {
            await authProvider.signOut();
            Navigator.pushReplacementNamed(context, AppRoutes.home);
          },
          child: Text('Logout'),
        ),
      ],
    );
  }
}
