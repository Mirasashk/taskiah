import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'dart:developer' as developer;

String get baseUrl {
  final url = dotenv.env['API_BASE_URL'];
  if (url == null || url.isEmpty) {
    throw Exception('API_BASE_URL not configured in .env file');
  }

  // Remove trailing slash if present
  final cleanUrl = url.endsWith('/') ? url.substring(0, url.length - 1) : url;
  developer.log('API Base URL: $cleanUrl');
  return cleanUrl;
}
