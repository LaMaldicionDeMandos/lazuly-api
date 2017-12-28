/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
const PERMISSIONS_URI = `${HOST}/auth/users`;
const SECRET = config.get('secret');

class UserController {

  static getPermissions(req, res) {
    const username = req.user.user_name;
    console.log('get Permissions user: ' + username);
    const options = {
      method: 'GET',
      headers: {
        'X-Authorization-Secret': SECRET
      },
      uri: `${PERMISSIONS_URI}/${username}/permissions`
    };
    request(options)
      .then((permissions) => res.send(permissions))
      .catch(() => res.status(500).send());
  }
}

module.exports = UserController;
