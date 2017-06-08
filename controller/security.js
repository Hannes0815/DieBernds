module.exports = function(req, res, next) {
  console.log('security check executed');
  next();
}
