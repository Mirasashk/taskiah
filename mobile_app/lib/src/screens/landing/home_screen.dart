import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../components/buttons/primary_button.dart';
import '../../components/buttons/secondary_button.dart';
import '../../providers/theme_provider.dart';
import 'dart:developer' as developer;

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  minHeight: constraints.maxHeight,
                  minWidth: constraints.maxWidth,
                ),
                child: IntrinsicHeight(
                  child: Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Center(
                          child: Container(
                            constraints: const BoxConstraints(maxWidth: 400),
                            child: Wrap(
                              spacing: 16,
                              runSpacing: 16,
                              alignment: WrapAlignment.center,
                              runAlignment: WrapAlignment.center,
                              children: [
                                ThemeProvider().isDarkMode
                                    ? Image(
                                        image: AssetImage(
                                          'assets/images/Logo_white.png',
                                        ),
                                        height: 100,
                                      )
                                    : Image(
                                        image: AssetImage(
                                          'assets/images/Logo_black.png',
                                        ),
                                        height: 100,
                                      ),
                                const Image(
                                  image: AssetImage(
                                    'assets/images/heroImg.png',
                                  ),
                                  height: 150,
                                ),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(height: 48),
                        // Hero Section
                        Text(
                          'Organize Your Tasks with Ease',
                          style: Theme.of(context)
                              .textTheme
                              .headlineLarge
                              ?.copyWith(
                                fontWeight: FontWeight.bold,
                              ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          'Simple, intuitive, and powerful task management to help you stay productive and focused.',
                          style:
                              Theme.of(context).textTheme.bodyLarge?.copyWith(
                                    color: Theme.of(context)
                                        .colorScheme
                                        .onSurfaceVariant,
                                  ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 32),
                        // Action Buttons
                        Center(
                          child: Container(
                            constraints: const BoxConstraints(maxWidth: 400),
                            child: Wrap(
                              alignment: WrapAlignment.center,
                              spacing: 16,
                              runSpacing: 16,
                              children: [
                                Container(
                                  constraints:
                                      const BoxConstraints(maxWidth: 180),
                                  child: PrimaryButton(
                                    label: 'Login',
                                    onPressed: () =>
                                        Navigator.pushNamed(context, '/login'),
                                    fullWidth: true,
                                  ),
                                ),
                                Container(
                                  constraints:
                                      const BoxConstraints(maxWidth: 180),
                                  child: SecondaryButton(
                                    label: 'Sign Up',
                                    onPressed: () =>
                                        Navigator.pushNamed(context, '/signup'),
                                    fullWidth: true,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        // Features Section
                        // const SizedBox(height: 64),
                        // Text(
                        //   'Key Features',
                        //   style: Theme.of(context)
                        //       .textTheme
                        //       .headlineMedium
                        //       ?.copyWith(
                        //         fontWeight: FontWeight.bold,
                        //       ),
                        //   textAlign: TextAlign.center,
                        // ),
                        // const SizedBox(height: 32),
                        // _buildFeatureCard(
                        //   context,
                        //   icon: Icons.touch_app,
                        //   title: 'Simple Interface',
                        //   description:
                        //       'Clean and intuitive design that helps you focus on what matters.',
                        // ),
                        // _buildFeatureCard(
                        //   context,
                        //   icon: Icons.flash_on,
                        //   title: 'Quick Actions',
                        //   description:
                        //       'Add, complete, and manage tasks with just a few taps.',
                        // ),
                        // _buildFeatureCard(
                        //   context,
                        //   icon: Icons.trending_up,
                        //   title: 'Progress Tracking',
                        //   description:
                        //       'Keep track of your completed tasks and stay motivated.',
                        // ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildFeatureCard(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String description,
  }) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 48,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(height: 16),
            Text(
              title,
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            Text(
              description,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
