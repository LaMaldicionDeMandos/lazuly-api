/**
 * Created by boot on 17/12/2017.
 */
const request = require('request-promise');

const HOST = config.get('host');
//staging
const USERS_URI = `${HOST}/users`;
//local
//const USERS_URI = `http://localhost:8082`;

const MIMETYPE_JPG = 'image/jpeg';

const FileStorageService = require('../services/file-storage-service');
const fileStorage = new FileStorageService();

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
    const userName = req.params.email || req.user.user_name;
    const options = {
      method: 'PATCH',
      headers: {
        'Authorization': req.headers.authorization
      },
      uri: `${USERS_URI}/${userName}/profile`,
      body: req.body,
      json: true
    };
    request(options)
      .then((user) => res.send(user.profile))
      .catch((err) => res.status(500).send(err));
  }

  static changePicture(req, res) {
    const user = req.user;
    console.log(`User ${JSON.stringify(user)}`);
    const file = req.files.picture;
    console.log(`File data: ${JSON.stringify(file)}`);
    if (MIMETYPE_JPG !== file.mimetype) return res.status(400).send();
    return fileStorage
      .builder(`${user.user_name}-${file.name}`, file.data)
      .upload()
      .then((url) => res.send(url))
      .catch((e) => res.status(500).send(e));
  }
}

module.exports = ProfileController;
