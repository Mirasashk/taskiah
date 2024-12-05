import 'package:flutter/material.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final bool showThemeToggle;
  final bool showProfileIcon;
  final VoidCallback? onThemeToggle;
  final VoidCallback? onProfileTap;

  const CustomAppBar({
    super.key,
    required this.title,
    this.showThemeToggle = true,
    this.showProfileIcon = true,
    this.onThemeToggle,
    this.onProfileTap,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return AppBar(
      backgroundColor: theme.colorScheme.surface,
      elevation: 0,
      title: Text(
        title,
        style: theme.textTheme.titleLarge?.copyWith(
          color: theme.colorScheme.onSurface,
        ),
      ),
      actions: [
        if (showThemeToggle)
          IconButton(
            icon: const Icon(Icons.brightness_6),
            onPressed: onThemeToggle,
            tooltip: 'Toggle theme',
          ),
        if (showProfileIcon)
          IconButton(
            icon: const Icon(Icons.person),
            onPressed: onProfileTap,
            tooltip: 'Profile',
          ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
