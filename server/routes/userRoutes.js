const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user (POST /signup)
router.post('/signup', userController.createUser);

// User login route
router.post('/login', userController.loginUser);

// Get all users
router.get('/', userController.getUsers); // Ensure this function is defined

// Get a user by ID
router.get('/:id', userController.getUserById); // Ensure this function is defined

// Update a user by ID
router.put('/:id', userController.updateUser); // Ensure this function is defined

// Delete a user by ID
router.delete('/:id', userController.deleteUser); // Ensure this function is defined

module.exports = router;
