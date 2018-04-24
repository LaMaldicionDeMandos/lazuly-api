const express = require('express');
const router = express.Router();
const profiles = require('../controllers/profile');
const authorize = require('../middlewares/verifytoken');

/* GET home page. */
router.get('/me', authorize, profiles.me);
router.patch('/:email', authorize, profiles.change);

module.exports = router;
