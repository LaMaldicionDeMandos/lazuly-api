/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');
const Redis = require("redis");
const randtoken = require('rand-token');

const redis = Redis.createClient(config.get('redis.port'), config.get('redis.host'));

const HOST = config.get('host');
const LOGIN_URI = `${HOST}/auth/oauth/token`;
const API_KEY = config.get('auth.app_key');
const SECRET = config.get('auth.secret');
const BASIC = `Basic ${new Buffer(API_KEY + ":" + SECRET).toString("base64")}`;

const EMAIL_URI = `${HOST}/mail`;
const EMAIL_CODE = config.get('forgot.email_code');
const APP_SECRET = config.get('secret');

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
        console.log(`Error: ${err}`);
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
        console.log(`Error: ${err}`);
        return res.status(400).send(err);
      });
  }

  static forgotPassword(req, res) {
    const userEmail = req.params.user;
    console.log(`${userEmail} olvido su contraseña`);
    const token = randtoken.generate(16);
    console.log(`generating token: ${token} for ${userEmail}`);
    redis.set(userEmail, token, 'EX', 10); //expire in 10 seconds
    redis.set(token, userEmail, 'EX', 10);

    const email = {
      code: EMAIL_CODE,
      to: [userEmail],
      payload: {token: token}
    };
    const options = {
      method: 'POST',
      headers: {
        'X-Authorization-Secret': APP_SECRET
      },
      uri: EMAIL_URI,
      body: email,
      json: true
    };
    request(options)
      .then(() => res.status(204).send())
      .catch(() => res.status(500).send());
  }
}

module.exports = LoginController;
