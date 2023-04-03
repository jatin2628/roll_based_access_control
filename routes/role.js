const express = require('express');
const router = express.Router();
const roleController = require('../controller/role');
const checkPermission = require('../middleware/checkPermission');
const verifyuser = require('../middleware/verify');

// Create a new Role
router.post('/role',verifyuser,checkPermission('role_add'),roleController.createRole);
            

// Get List of Roles
router.get('/role',verifyuser,checkPermission('role_get_all'),roleController.getRole);

// Get Role by ID


// Delete a Role
router.delete('/role:id',verifyuser,checkPermission('role_delete'),roleController.deleteRole);



module.exports = router;