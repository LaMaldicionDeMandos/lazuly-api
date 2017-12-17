const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contacts');

/* GET home page. */
router.post('/contact', contacts.sendMessage);

module.exports = router;
