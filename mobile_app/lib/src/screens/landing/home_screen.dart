import 'package:flutter/material.dart';
import '../../components/buttons/primary_button.dart';
import '../../components/buttons/secondary_button.dart';
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
                        const SizedBox(height: 48),
                        Center(
                          child: Container(
                            constraints: const BoxConstraints(maxWidth: 400),
                            child: Wrap(
                              spacing: 16,
                              runSpacing: 16,
                              alignment: WrapAlignment.center,
                              runAlignment: WrapAlignment.center,
                              children: [
                                _logo(context),
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
                          'Organize Your Tasks with Ease test',
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

  Widget _logo(BuildContext context) {
    final theme = Theme.of(context);
    developer.log(
        'Here we go !!!!!! ---------------------------------------------------------------');
    return Image(
      image: AssetImage(
        theme.brightness == Brightness.dark
            ? 'assets/images/Logo_white.png'
            : 'assets/images/Logo_black.png',
      ),
      height: 100,
    );
  }
}
