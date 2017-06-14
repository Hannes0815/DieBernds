var blog = require('../data/blog.json');

exports.list = function(req, res) {
  if (res.locals.authenticated) {
    res.json(blog);
  } else {
    res.json(blog.filter((element) => {
      return !element.hidden;
    }));
  }
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
