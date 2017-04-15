var express = require('express');
var router = express.Router();

// router.prefix('/api')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
