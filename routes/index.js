var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hyperloop Transportation Technologies' });
});

router.get('/citypair', function(req, res, next){
  res.render('pair', { title: 'Los Angeles to San Francisco Routes'});
});

router.get('/aroute', function(req, res, next){
  res.render('aroute', { title: 'A particular route between LA and SF'});
});

module.exports = router;
