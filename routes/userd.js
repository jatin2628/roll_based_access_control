const express = require('express');
const userdConty = require('../controller/userd');
const checkPermission = require('../middleware/checkPermission');
const verifyuser = require('../middleware/verify');

const router = express.Router();

// Create a new User
router.post('/register',userdConty.createNewUser);

// Get List of Users
router.get('/getusers',verifyuser,checkPermission('user_get_all'),userdConty.getAllUser);

// Get User by ID
router.get('/user:id',verifyuser, checkPermission('user_get'),userdConty.getUser);

// Update a User
router.put('/user:id', verifyuser,checkPermission( 'role_update'),userdConty.UpdateUser);

// Delete a User
router.delete('/user:id',verifyuser,checkPermission('role_delete')
      );

module.exports = router;

