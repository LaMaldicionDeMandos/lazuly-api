/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
const USERS_URI = `${HOST}/profiles`;

var profile = {};
profile.last_name = 'Pasut';
profile.first_name = 'Marcelo';
profile.email = 'pasutmarcelo@gmail.com';
profile.contact_email = 'pasutmarcelo@gmail.com';

class ProfileController {

  static me(req, res) {
    console.log('get my profile');
    /*
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
      */
    res.send(profile);
  }

  static change(req, res) {
    console.log('change my profile');
    profile = req.body;
    res.send(profile);
  }
}

module.exports = ProfileController;
