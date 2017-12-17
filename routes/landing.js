var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/contact', (req, res) => {
  const body = req.body;
  console.log("sending message to contacts...");
  console.log(JSON.stringify(body));
  res.send(body);
});

module.exports = router;
