import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';  // Replace with your actual API URL

// Function to create a new user
export const createUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',                // Specify the method
        headers: {
          'Content-Type': 'application/json'  // Set the Content-Type to application/json
        },
        body: JSON.stringify(userData)  // Convert userData object to JSON string
      });
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, message: errorData.message || 'Failed to create user' };
      }
  
      // Parse and return the JSON response
      const data = await response.json();
      return data;  // Assuming your API returns JSON with a success status
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, message: 'Failed to create user' };
    }
  };


  // Function to log in a user
export const loginUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)  // Convert user data to JSON
      });
  
      const data = await response.json();
  
      // Check if the response is OK
      if (!response.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }
  
      return data;  // Return the response data
    } catch (error) {
      console.error('Error logging in:', error);
      return { success: false, message: 'An error occurred while logging in' };
    }
  };
  
