

const API_URL = 'http://localhost:5001/api/users';  // Replace with your actual API URL

// Function to create a new user
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Failed to create user' };
    }

    const data = await response.json();
    return { success: true, userId: data.user._id };  // Return user ID
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
      body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Login failed' };
    }

    return { success: true, token: data.token, userId: data.userId };  // Return token and user ID
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'An error occurred while logging in' };
  }
};
