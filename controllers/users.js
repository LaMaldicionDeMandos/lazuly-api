/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
const SECRET = config.get('secret');

class UserController {

  static getPermissions(req, res) {
    console.log('get Permissions user: ' + req.user.user_name);
    res.send('ok ' + req.user.user_name);
  }
}

module.exports = UserController;
