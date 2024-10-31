const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user (POST /signup)
router.post('/signup', userController.createUser);

// User login route
router.post('/login', userController.loginUser);

// Get all users
router.get('/', userController.getUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
