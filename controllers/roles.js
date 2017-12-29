/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');
const _ = require('lodash');

const HOST = config.get('host');
const BO_ROLES_URI = `${HOST}/auth/roles?codes=directive&codes=admin`;
const SECRET = config.get('secret');

class RolesController {

  static getRolesBo(req, res) {
    console.log('get Roles request to ' + BO_ROLES_URI);
    const options = {
      method: 'GET',
      headers: {
        'X-Authorization-Secret': SECRET
      },
      uri: BO_ROLES_URI,
      json: true
    };
    request(options)
      .then((roles) => {
        console.log(`Roles -> ${roles}`);
        roles.forEach((role) => delete role.permissions);
        res.send(roles);
      })
      .catch((err) => res.status(500).send(err));
  }
}

module.exports = RolesController;
