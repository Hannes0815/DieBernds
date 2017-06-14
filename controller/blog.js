var blog = require('../data/blog.json');
var fs = require('fs');

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
  if (!res.locals.authenticated && blog[req.params.id].hidden) {
    res.status(401).send();
    return;
  }
  if (!blog[req.params.id]) {
    res.status(404).send();
    return;
  }
  res.json(blog[req.params.id]);
}

exports.create = function(req, res) {
  res.send('create');
}

exports.update = function(req, res) {
  res.send('update ' + req.params.id);
}

exports.delete = function(req, res) {
  if (!blog[req.params.id]) {
    res.status(404).send();
    return;
  }

  if (!res.locals.authenticated && blog[req.params.id].hidden) {
    res.status(401).send();
    return;
  }

  blog.splice(req.params.id, 1);

  fs.writeFile('./data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).send();
    }
  });
}
