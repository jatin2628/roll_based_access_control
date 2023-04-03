const express = require('express');
const userController = require('../controller/user');
const verifyuser = require('../middleware/verify');
const {checkAdmin,checkRole,checkUser,checkSRole,checkPRole} = require('../middleware/check');

const router = express.Router();

router.post('/register',userController.register);

router.post('/login',userController.login);

router.get('/profile',verifyuser,checkRole, userController.profile);

router.get('/users',verifyuser,checkAdmin, userController.getusers);


//second method routes

router.get('/profiles',verifyuser,checkSRole(['user']), userController.profile);

router.get('/userss',verifyuser,checkSRole(['admin']), userController.getusers);


//3rd Approach routes


router.get('/profiless',verifyuser,checkPRole('read'), userController.profile);

router.get('/usersss',verifyuser,checkPRole('delete'), userController.getusers);


module.exports = router;