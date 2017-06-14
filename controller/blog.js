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
  if (!blog[req.params.id]) {
    res.status(404).send();
    return;
  }

  if (!res.locals.authenticated && blog[req.params.id].hidden) {
    res.status(401).send();
    return;
  }

  blog[req.params.id].title   = req.body.title    || blog[req.params.id].title;
  blog[req.params.id].picture = req.body.picture  || blog[req.params.id].picture;
  blog[req.params.id].author  = req.body.author   || blog[req.params.id].author;
  blog[req.params.id].about   = req.body.about    || blog[req.params.id].about;
  blog[req.params.id].released= req.body.released || blog[req.params.id].released;
  blog[req.params.id].hidden  = req.body.hidden   || blog[req.params.id].hidden;
  blog[req.params.id].tags    = req.body.tags     || blog[req.params.id].tags;

  fs.writeFile('./data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(200).json(blog[req.params.id]);
    }
  });
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
