const express = require('express');
const router = express.Router();
const roles = require('../controllers/roles');

/* GET home page. */
router.get('/', roles.getRolesBo);

module.exports = router;
