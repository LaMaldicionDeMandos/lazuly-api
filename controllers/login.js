/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
const LOGIN_URI = `${HOST}/auth/oauth/token`;
const API_KEY = config.get('auth.app_key');
const SECRET = config.get('auth.secret');
const BASIC = `Basic ${new Buffer(API_KEY + ":" + SECRET).toString("base64")}`;

const getOptions = (form) => {
  return {
    method: 'POST',
    uri: LOGIN_URI,
    headers: {
      'Authorization': BASIC,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: form,
    json: true
  };
};
class LoginController {

  static login(req, res) {
    console.log(`Authorization: ${BASIC}`);
    const options = getOptions({
      'grant_type': 'password',
      'scope': 'web',
      'username': req.body.username,
      'password': req.body.password
    });
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

  static refresh(req, res) {
    console.log(`Authorization: ${BASIC}`);
    console.log(`Refresh Token: ${req.params.token}`);
    const options = getOptions({
      'grant_type': 'refresh_token',
      'scope': 'web',
      'refresh_token': req.params.token,
    });
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
