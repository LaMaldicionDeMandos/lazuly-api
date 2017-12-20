/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
const SIGNUP_URI = `${HOST}/auth/users/registration`;
console.log(`Registration uri: ${SIGNUP_URI}`);

class RegisterController {

  static register(req, res) {
    const body = req.body;
    console.log(`request: ${JSON.stringify(body)}`);
    const options = {
      method: 'POST',
      uri: SIGNUP_URI,
      body: body,
      json: true
    };
    request(options)
      .then((result) => {
        console.log(`Result: ${JSON.stringify(result)}`);
        res.status(201).send()
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
    });
  }
}

module.exports = RegisterController;
