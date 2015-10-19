var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var bcrypt = require('bcrypt')
var validator = require('../public/javascripts/validator.js')
var db = require('monk')('localhost/developmentTracker');
var childCollection = db.get('devtrack');
var db = require('monk')('localhost/devtrackerUsers');
var userCollection = db.get('users');

router.get('/tracker/index', function (req, res, next) {
  var userName = req.cookies.currentUser;
    res.render('tracker/index', {currentUser: userName})
});

router.get('/tracker/signup', function(req, res, next){
  res.render('tracker/signup', {validator: []})
});

router.post('/tracker/signup', function(req, res, next){
  var hash = bcrypt.hashSync(req.body.password, 10);
  var password = req.body.password;
  var pwdConf = req.body.pwdConf;
  var email = req.body.email;
  var errors = validator.passwordValidator(password, pwdConf, email, userCollection)
  var errorArray = [];
  if (errors.length != 0){
    res.render('tracker/signup', {errors: errors})
  } else {
    userCollection.findOne({email: req.body.email}, function(err, record) {
      if(record) {
        errorArray.push("Email already exists")
        res.render('tracker/signin', { errors: errorArray })
      } else {
        userCollection.insert({
             email: req.body.email,
             password: hash
           });
          res.cookie('currentUser', req.body.email)
          res.redirect('/tracker/index');
      }
    })
  }
});

router.get('/tracker/signin', function(req, res, next){
  res.render('tracker/signin', {validator: []});
});

router.post('/tracker/signin', function(req, res, next){
  var email =  req.body.email;
  var password = req.body.password;
  var errors = validator.userValidator(password, email, userCollection);
  var errorArray = [];
  if (errors.length != 0){
    res.render('tracker/signin', {errors: errors})
  } else {
    userCollection.findOne({email: req.body.email}, function(err, record){
      if (!record){
        errorArray.push("User doesn't exist")
        res.render('tracker/signup', {errors: errorArray })
      }
      else {
        userCollection.findOne({email: req.body.email}, function(err, record){
          if(bcrypt.compareSync(password, record.password)){
            res.cookie('currentUser', req.body.email)
            res.redirect('/tracker/index');
          } else {
            errorArray.push("Password incorrect!")
            res.render('tracker/signin', { errors: errorArray })
          }
        })
      }
    })
    }
});

router.get('/tracker/milestones', function (req, res, next) {
  res.render('tracker/milestones')
});

router.post('/tracker/smile', function (req, res, next) {
  // var smile = req.body.smile;
  // var comment = req.body.comment;
  childCollection.insert({
    smile: req.body.smile,
    comment1: req.body.comment1
  });
  res.redirect('/tracker/index')
});

router.post('/tracker/sound', function (req, res, next) {
  childCollection.insert({
    sound: req.body.sound,
    comment2: req.body.comment2
  })
  res.redirect('/tracker/index')
});

router.post('/tracker/holdHead', function (req, res, next) {
  childCollection.insert({
    holdHead: req.body.holdHead,
    comment3: req.body.comment3
  })
  res.redirect('/tracker/index')
});

router.post('/tracker/rolls', function (req, res, next) {
  childCollection.insert({
    rolls: req.body.rolls,
    comment4: req.body.comment4
  })
  res.redirect('/tracker/index')
});

router.post('/tracker/sitUp', function (req, res, next) {
  childCollection.insert({
    sitUp: req.body.sitUp,
    comment5: req.body.comment5
  })
  res.redirect('/tracker/index')
});

router.post('/tracker/crawl', function (req, res, next) {
  childCollection.insert({
    crawl: req.body.crawl,
    comment6: req.body.comment6
  })
  res.redirect('/tracker/index')
});

router.post('/tracker/supportStand', function (req, res, next) {
  childCollection.insert({
    supportStand: req.body.supportStand,
    comment7: req.body.comment7
  })
  res.redirect('/tracker/index')
});

router.post('/tracker/aloneStand', function (req, res, next) {
  childCollection.insert({
    aloneStand: req.body.aloneStand,
    comment8: req.body.comment8
  })
  res.redirect('/tracker/index')
});

router.post('/tracker/helpwalk', function (req, res, next) {
  childCollection.insert({
    helpwalk: req.body.helpwalk,
    comment9: req.body.comment9
  })
  res.redirect('/tracker/index')
});

router.post('/tracker/aloneWalk', function (req, res, next) {
  childCollection.insert({
    aloneWalk: req.body.aloneWalk,
    comment10: req.body.comment10
  })
  res.redirect('/tracker/index')
});
// router.post('/tracker/milestones',function (req, res, next) {
//   childCollection.insert({
//     first: req.body.first,
//     middle: req.body.middle,
//     last: req.body.last
//   }).then(function (child) {
//     res.redirect('/tracker/index')
//   })
// });
//
// router.get('/tracker/new', function (req, res, next) {
//   res.render('tracker/new')
// });

module.exports= router;
