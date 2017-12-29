/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
const PERMISSIONS_URI = `${HOST}/auth/users`;
const USERS_URI = `${HOST}/users`;
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

  static getUsers(req, res) {
    const username = req.user.user_name;
    console.log('get user: ' + username);
    console.log('authorization header: ' + req.headers.authorization);
    const options = {
      method: 'GET',
      headers: {
        'Authorization': req.headers.authorization
      },
      uri: USERS_URI,
      json: true
    };
    request(options)
      .then((users) => res.send(users))
      .catch((err) => res.status(500).send(err));
  }

  static change(req, res) {
    console.log('change user: ' + JSON.stringify(req.body));
    const options = {
      method: 'PUT',
      headers: {
        'Authorization': req.headers.authorization
      },
      uri: `${USERS_URI}/${req.params.email}`,
      body: req.body,
      json: true
    };
    request(options)
      .then((users) => res.send(users))
      .catch((err) => res.status(500).send(err));
  }
}

module.exports = UserController;
