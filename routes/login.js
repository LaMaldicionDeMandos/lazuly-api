const express = require('express');
const router = express.Router();
const login = require('../controllers/login');

/* GET home page. */
router.post('/login', login.login);
router.get('/refresh/:token', login.refresh);
router.post('/forgot/:user', login.forgotPassword);
router.patch('/password/:token', login.restorePassword);

module.exports = router;
