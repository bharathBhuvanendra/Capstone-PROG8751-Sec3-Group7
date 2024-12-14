import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';
import { getBookings } from '../models/bookingModel'; // Import the function to fetch bookings

const USERS_API_URL = process.env.REACT_APP_BACKEND_URL ? `${process.env.REACT_APP_BACKEND_URL}/api/users` : 'http://localhost:5001/api/users';
// const BOOKINGS_API_URL = 'http://localhost:5001/api/bookings';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' });

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(USERS_API_URL);
      const usersData = Array.isArray(response.data) ? response.data : response.data.users || [];
      setUsers(usersData);
      setLoadingUsers(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoadingUsers(false);
    }
  };

  // Fetch bookings from the API
  const fetchBookings = async () => {
    try {
      const response = await getBookings(); // Fetch all bookings using the getBookings function
      if (response.success) {
        setBookings(response.bookings);
      } else {
        console.error('Error fetching bookings:', response.message);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingBookings(false);
    }
  };

  // Create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${USERS_API_URL}/signup`, newUser);
      fetchUsers(); // Refresh user list after creating a user
      setNewUser({ firstName: '', lastName: '', email: '', password: '', role: '' }); // Reset form
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Delete a user
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${USERS_API_URL}/${userId}`);
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBookings(); // Fetch bookings when the component mounts
  }, []);

  if (loadingUsers || loadingBookings) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h1 aria-label="Admin Dashboard">Admin Dashboard</h1>
      
      {/* User Management Form */}
      <form onSubmit={handleCreateUser} aria-label="Create New User Form">
        <label htmlFor="firstName" aria-label="First Name">First Name</label>
        <input
          id="firstName"
          type="text"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
          required
          aria-required="true"
        />
        <label htmlFor="lastName" aria-label="Last Name">Last Name</label>
        <input
          id="lastName"
          type="text"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
          required
          aria-required="true"
        />
        <label htmlFor="email" aria-label="Email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          required
          aria-required="true"
        />
        <label htmlFor="password" aria-label="Password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
          required
          aria-required="true"
        />
        <label htmlFor="role" aria-label="Role">Role</label>
        <select
          id="role"
          value={newUser.role}
          onChange={e => setNewUser({ ...newUser, role: e.target.value })}
          aria-label="Select Role"
          aria-required="true"
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" aria-label="Create User">Create User</button>
      </form>

      {/* Users Table */}
      <table aria-label="User List">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="actions">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  aria-label={`Delete ${user.firstName} ${user.lastName}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bookings Table */}
      <h2>Bookings</h2>
      <table aria-label="Bookings List">
        <thead>
          <tr>
            <th>User</th>
            <th>Car Model</th>
            <th>Plate Number</th>
            <th>Booking Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td>{booking.user_id?.firstName} {booking.user_id?.lastName}</td>
              <td>{booking.car_model}</td>
              <td>{booking.plate_number}</td>
              <td>{new Date(booking.Date).toLocaleDateString()}</td>
              <td className="actions">
                {/* Add actions here if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
