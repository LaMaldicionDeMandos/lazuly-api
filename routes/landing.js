const express = require('express');
const router = express.Router();
const contacts = require('../controllers/contacts');
const registry = require('../controllers/registry');

/* GET home page. */
router.post('/contact', contacts.sendMessage);
router.post('/register', registry.register);

module.exports = router;
