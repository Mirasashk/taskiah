import 'package:http/http.dart' as http;
import 'dart:convert';
import '../config/api_config.dart'
    as api_config; // This contains the base URL of your API

class ApiService {
  final String baseUrl = api_config.baseUrl;
  // Function to handle GET requests
  Future<dynamic> getRequest(String endpoint) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.get(url);
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to load data: \${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }

  // Function to handle POST requests
  Future<dynamic> postRequest(
      String endpoint, Map<String, dynamic> data) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(data),
      );
      if (response.statusCode == 201) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to create data: \${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }

  // Function to handle PUT requests
  Future<dynamic> putRequest(String endpoint, Map<String, dynamic> data) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.put(
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonEncode(data),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        throw Exception('Failed to update data: \${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }

  // Function to handle DELETE requests
  Future<void> deleteRequest(String endpoint) async {
    final url = Uri.parse('$baseUrl$endpoint');
    try {
      final response = await http.delete(url);
      if (response.statusCode != 200) {
        throw Exception('Failed to delete data: \${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }
}
