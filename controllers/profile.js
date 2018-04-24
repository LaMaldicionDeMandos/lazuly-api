/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
//staging
const USERS_URI = `${HOST}/users`;
//local
//const USERS_URI = `http://localhost:8082`;

class ProfileController {

  static me(req, res) {
    console.log('get my profile');
    const options = {
      method: 'GET',
      headers: {
        'Authorization': req.headers.authorization
      },
      uri: `${USERS_URI}/me/profile`,
      json: true
    };
    request(options)
      .then((users) => res.send(users))
      .catch((err) => res.status(500).send(err));
  }

  static change(req, res) {
    console.log(`params: ${JSON.stringify(req.params)}`);
    const options = {
      method: 'PATCH',
      headers: {
        'Authorization': req.headers.authorization
      },
      uri: `${USERS_URI}/${req.params.email}/profile`,
      body: req.body,
      json: true
    };
    request(options)
      .then((user) => res.send(user))
      .catch((err) => res.status(500).send(err));
  }
}

module.exports = ProfileController;
