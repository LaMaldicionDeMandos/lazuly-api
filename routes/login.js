const express = require('express');
const router = express.Router();
const login = require('../controllers/login');

/* GET home page. */
router.post('/login', login.login);
router.get('/refresh/:token', login.refresh);

module.exports = router;
