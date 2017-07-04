var blog = require('../data/blog.json');
var fs = require('fs');
var ObjectID = require('mongodb').ObjectID;

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
  if (!res.locals.authenticated) {
    res.status(401).send();
    return;
  }

  if (!req.body.title || !req.body.picture || !req.body.author || !req.body.about || !req.body.released || !req.body.hidden || !req.body.tags) {
    res.status(400).send();
    return;
  }

  // nächsten freien Index suchen
  var newIndex = blog.length;
  while (blog.filter((element) => { return element.index == newIndex}).length > 0) {
    newIndex += 1;
  }

  var newBlogPost = {
    _id     : new ObjectID(),
    index   : newIndex,
    title   : req.body.title,
    picture : req.body.picture,
    author  : req.body.author,
    about   : req.body.about,
    released: req.body.released,
    hidden  : req.body.hidden,
    tags    : req.body.tags
  };

  blog.push(newBlogPost);

  fs.writeFile('./data/blog.json', JSON.stringify(blog), 'utf-8', (err) => {
    if (err) {
      res.status(500).json({error: err});
    } else {
      res.status(201).json({index: newIndex, id: newBlogPost._id});
    }
  });
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
