var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // if no token was provided or could not be verified, the request is not authenticated
  res.locals.authenticated = false;
  // look for the token
  var token = req.headers['x-bernd-token'];
  if (token) {
    // secret should not be hardcoded nor should it be commited to public vcs in cleartext, but wayne :D
    try {
      var decodedJwt = jwt.verify(token, 'BerndsGeheimesSignaturSecret!!11');
      res.locals.authenticated = true;
      res.locals.token = decodedJwt;
    } catch (e) {
      // noop
      // If the token could not be verified, handle gracefully and just keep the request unauthenticated
    }
  }
  next();
}
