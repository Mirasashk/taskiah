import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../routes/app_routes.dart';

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
        Text('${authProvider.currentAuthUser?.email}'),
        Text('Dashboard'),
        ElevatedButton(
          onPressed: () async {
            await authProvider.signOut();
            if (!context.mounted) return;
            Navigator.pushReplacementNamed(context, AppRoutes.home);
          },
          child: Text('Logout'),
        ),
        ElevatedButton(
          onPressed: () async {
            try {
              await authProvider.updateUserProfile(
                firstName: 'New Name',
                lastName: 'New Last Name',
              );
              // Show success message
            } catch (e) {
              // Handle error
            }
          },
          child: Text('Update Profile'),
        ),
        ElevatedButton(
          onPressed: () async {
            try {
              await authProvider.updateEmail('newemail@example.com');
              // Show success message
            } catch (e) {
              // Handle error
            }
          },
          child: Text('Update Email'),
        ),
      ],
    );
  }
}
