const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const authorize = require('../middlewares/verifytoken');

/* GET home page. */
router.get('/me/permissions', authorize, users.getPermissions);
router.get('/', authorize, users.getUsers);
router.put('/:email', authorize, users.change);
router.delete('/:email', authorize, users.remove);
router.post('/', authorize, users.newUser);

module.exports = router;
