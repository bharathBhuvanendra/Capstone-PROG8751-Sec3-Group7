

const API_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/users` :  'http://localhost:5001/api/users';  

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

    // Return token, userId, and userEmail
    return { 
      success: true, 
      message: 'Login successful', 
      role: data.role, 
      token: data.token, 
      userId: data.userId,
      userEmail: data.userEmail // Add userEmail here
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'An error occurred while logging in' };
  }
};


// Function to get user details by user ID
export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to fetch user details' };
    }

    return { success: true, user: data.user };  // Return the user details
  } catch (error) {
    console.error('Error fetching user details:', error);
    return { success: false, message: 'An error occurred while fetching user details' };
  }
};
