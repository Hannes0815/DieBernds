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
  if (!res.locals.authenticated) {
    res.status(403).send();
    return;
  }

  var user = require('../data/user.json');

  if (req.body.password != user.password) {
    res.status(403).json({
      message: 'Password is incorrect'
    });
    return;
  }

  user.password = req.body.newPassword;


  var fs = require('fs');

  fs.writeFile('./data/user.json', JSON.stringify(user), 'utf-8', (err) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).send();
    }
  });
}
