

const API_URL = 'http://localhost:5001/api/bookings';  // Replace with your actual API URL

// Function to create a new booking
export const createBooking = async (bookingData) => {
  console.log(bookingData);
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
    return { success: true, data: data.data }; // Updated to correctly access the booking object
  } catch (error) {
    console.error('Error creating booking:', error);
    return { success: false, message: 'Failed to create booking' };
  }
};

// Function to get all bookings (if needed)
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

    return { success: true, bookings: data }; // Return token and user ID
  } catch (error) {
    console.error('Error fetching booking data:', error);
    return { success: false, message: 'An error occurred while fetching booking data' };
  }
};
