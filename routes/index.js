var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('customer/main', { title: 'Express' });
});

router.get('/', function(req, res, next) {
  res.render('layout/mainLayout', { title: 'Express' });
});

module.exports = router;
