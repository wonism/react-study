var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/simple_example', function(req, res, next) {
  res.render('simple_example');
});

module.exports = router;

