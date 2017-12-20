/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
const CONTACT_URI = `${HOST}/mail`;
const CONTACTS = config.get('contact.emails');
const CONTACT_CODE = config.get('contact.email_code');
const SECRET = config.get('secret');

class ContactController {

  static sendMessage(req, res) {
    const body = req.body;
    const email = {
      code: CONTACT_CODE,
      to: CONTACTS,
      payload: body
    };
    const options = {
      method: 'POST',
      headers: {
        'X-Authorization-Secret': SECRET
      },
      uri: CONTACT_URI,
      body: email,
      json: true
    };
    request(options)
      .then(() => res.status(204).send())
      .catch(() => res.status(500).send());
  }
}

module.exports = ContactController;
