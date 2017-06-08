var express = require('express');
var router = express.Router();
var blogController = require('../controller/blog.js');

router.get('/', blogController.list);
router.post('/', blogController.create);

router.route('/:id([0-9]+)')
  .get(blogController.show)
  .delete(blogController.delete)
  .put(blogController.update);

module.exports = router;
