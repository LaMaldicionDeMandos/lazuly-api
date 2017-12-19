/**
 * Created by boot on 17/12/2017.
 */
class RegisterController {

  static register(req, res) {
    const body = req.body;
    console.log(JSON.stringify(body));
    res.status(201).send(body);
  }
}

module.exports = RegisterController;
