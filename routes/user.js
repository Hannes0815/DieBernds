var express = require('express');
var router = express.Router();
var userController = require('../controller/user');

router.put('/login', userController.login);
router.put('/passwordRecovery', userController.changePassword);

module.exports = router;
