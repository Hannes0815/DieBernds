var jwt = require('jsonwebtoken');

exports.login = function(req, res) {
  var user = require('../data/user.json');

  if (req.body.username != user.username || req.body.password != user.password) {
    res.status(403).json({
      message: 'Username or password is incorrect'
    });
    return;
  }

  // generate token
  var token = jwt.sign({username: user.username}, 'BerndsGeheimesSignaturSecret!!11');

  res.status(200).json({
    token: token
  });
}

exports.changePassword = function(req, res) {
  res.send('change pw');
}
