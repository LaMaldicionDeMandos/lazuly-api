/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
const LOGIN_URI = `${HOST}/auth/oauth/token`;
const API_KEY = config.get('auth.bo_app_key');
const SECRET = config.get('auth.secret');
const BASIC = `Basic ${new Buffer(API_KEY + ":" + SECRET).toString("base64")}`;
class LoginController {

  static login(req, res) {
    console.log(`Authorization: ${BASIC}`);
    const options = {
      method: 'POST',
      uri: LOGIN_URI,
      headers: {
        'Authorization': BASIC,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        'grant_type': 'password',
        'scope': 'web',
        'username': req.body.username,
        'password': req.body.password
      },
      json: true
    };
    request(options)
      .then((result) => {
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).send(result);
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
        return res.status(400).send(err);
      });
  }
}

module.exports = LoginController;
