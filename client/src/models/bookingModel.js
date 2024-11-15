

const API_URL = 'http://localhost:5001/api/bookings';  // Replace with your actual API URL

// Function to create a new user
export const createBooking = async (userData) => {
  console.log(userData)
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || 'Failed to create booking' };
    }

    const data = await response.json();
    return { success: true, bookings: data };  // Return user ID
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, message: 'Failed to create booking' };
  }
};

// Function to log in a user
export const getBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to fetch booking data' };
    }

    return { success: true, bookings: data };  // Return token and user ID
  } catch (error) {
    console.error('Error fwtching booking data:', error);
    return { success: false, message: 'An error occurred while fetching booking data' };
  }
};
