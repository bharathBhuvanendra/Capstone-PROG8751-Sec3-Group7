// File: client/bookingModel.js

const API_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/bookings` : 'http://localhost:5001/api/bookings';

// Function to create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error || 'Failed to create booking' };
    }

    const data = await response.json();
    return { success: true, data: data.data };
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, message: 'Failed to create booking' };
  }
};

// Function to get all bookings
export const getBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to fetch booking data' };
    }

    return { success: true, bookings: data };
  } catch (error) {
    console.error('Error fetching booking data:', error);
    return { success: false, message: 'An error occurred while fetching booking data' };
  }
};

// Function to get bookings by user_id
export const getBookingsByUserId = async (user_id) => {
  try {
    const response = await fetch(`${API_URL}/user/${user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, message: data.message || 'Failed to fetch user-specific booking data' };
    }

    return { success: true, bookings: data.data };
  } catch (error) {
    console.error('Error fetching user-specific booking data:', error);
    return { success: false, message: 'An error occurred while fetching booking data' };
  }
};
