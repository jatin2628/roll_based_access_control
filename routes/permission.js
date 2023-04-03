const express = require('express');
const router = express.Router();
const perController = require('../controller/permission');
const checkPermission = require('../middleware/checkPermission');
const verifyuser = require('../middleware/verify');

// Create a new permission
router.post('/permission',verifyuser,checkPermission('permissions_add'),perController.addPer);

// Get List of permissions
router.get('/permission', verifyuser,checkPermission('permissions_get_all'),perController.getPer);



module.exports = router;