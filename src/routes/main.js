const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');
const formValidator = require('../validators/mainValidator');

router.get('/', controller.main);
router.post('/', formValidator, controller.processRegister);
router.get('/user', controller.user);
router.get('/user/reset', controller.userReset);









module.exports = router;