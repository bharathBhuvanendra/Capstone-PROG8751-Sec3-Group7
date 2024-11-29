import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css'; // Import the CSS file

const API_URL = 'http://localhost:5001/api/users';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: '' });

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      // Ensure users is set as an array
      const usersData = Array.isArray(response.data) ? response.data : response.data.users || [];
      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  // Create a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/signup`, newUser);
      fetchUsers(); // Refresh user list after creating a user
      setNewUser({ firstName: '', lastName: '', email: '', password: '', role: '' }); // Reset form
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Delete a user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      fetchUsers(); // Refresh user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard">
      <h1 aria-label="Admin Dashboard">Admin Dashboard</h1>
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
                  onClick={() => handleDelete(user._id)}
                  aria-label={`Delete ${user.firstName} ${user.lastName}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
