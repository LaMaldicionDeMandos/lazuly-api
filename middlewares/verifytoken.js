/**
 * Created by boot on 27/12/2017.
 */
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'aidafrancoygeorgelosamo';

module.exports = function(req,res,next) {
  const token = req.headers['authorization'];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token.substr('bearer '.length), JWT_SECRET, function(err, decoded) {
      if (err) { //failed verification.
        return res.status(401).json({"error": err});
      }
      req.user = decoded;
      next(); //no error, proceed
    });
  } else {
    // forbidden without token
    return res.status(403).send({
      "error": true
    });
  }
}