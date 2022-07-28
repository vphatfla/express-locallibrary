var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {para : "This is users page" + req.method});
});
router.get('/cool', function(req,res,next) {
  res.render('users', {para: "You are cool, not so cool"});
})

module.exports = router;
