exports.list = function(req, res) {
  res.send('list');
}

exports.show = function(req, res) {
  res.send('show ' + req.params.id);
}

exports.create = function(req, res) {
  res.send('create');
}

exports.update = function(req, res) {
  res.send('update ' + req.params.id);
}

exports.delete = function(req, res) {
  res.send('delete ' + req.params.id);
}
