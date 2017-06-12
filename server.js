var express = require('express');
var bodyparser = require('body-parser');
var app = express();

var user = require('./routes/user');
var blog = require('./routes/blog');
var security = require('./controller/security');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/api/V1', security);
app.use('/api/V1', user);
app.use('/api/V1/blog', blog);

var server = app.listen(8082, function() {
  console.log('BerndsBlog listening on port %s', server.address().port);
});
