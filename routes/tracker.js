var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var validator = require('../public/javascripts/validator.js')
// var db = require('monk')('localhost/developmentTracker');
// var childCollection = db.get('devtrack');
var db = require('monk')('localhost/devtrackerUsers');
var userCollection = db.get('users');

router.get('/tracker/index', function (req, res, next) {
  var userName = req.cookies.currentUser;
    res.render('tracker/index', {currentUser: userName})
    //add this to the render once signin is in progress: , {currentUser: userName}
});

router.get('/tracker/milestones', function (req, res, next) {
  res.render('tracker/milestones')
});

router.get('/tracker/signup', function(req, res, next){
  res.render('tracker/signup', {validator: []})
});

router.post('/tracker/signup', function (req, res, next) {
  // var hash = bcrypt.hashSync(req.body.password, 10);
  // var password = req.body.password;
  // var pwdConf = req.body.pwdConf;
  // var email = req.body.email;
  // var errors = validator.passwordValidator(password, pwdConf, email, userCollection)
  // var errorArray = [];
  // if (errors.length != 0){
  //   res.render('tracker/signup', {errors: errors})
  // } else {
  //   userCollection.findOne({email: req.body.email}, function(err, record) {
  //     if(record) {
  //       errorArray.push("Email already exists")
  //       res.render('tracker/signin', { errors: errorArray })
  //     } else {
  //       userCollection.insert({
  //            email: req.body.email,
  //            password: hash
  //          });
  //         res.cookie('currentUser', req.body.email)
  //         res.redirect('/tracker/index');
  //     }
  //   })
  // }
  res.render('tracker/index')
});

// router.get('/tracker/signin', function(req, res, next){
//   res.render('tracker/signin', {validator: []});
// });
//
// router.post('/tracker/signin', function(req, res, next){
//   var email =  req.body.email;
//   var password = req.body.password;
//   var errors = validator.userValidator(password, email, userCollection);
//   var errorArray = [];
//   if (errors.length != 0){
//     res.render('tracker/signin', {errors: errors})
//   } else {
//     userCollection.findOne({email: req.body.email}, function(err, record){
//       if (!record){
//         errorArray.push("User doesn't exist")
//         res.render('tracker/signup', {errors: errorArray })
//       }
//       else {
//         userCollection.findOne({email: req.body.email}, function(err, record){
//           if(bcrypt.compareSync(password, record.password)){
//             res.cookie('currentUser', req.body.email)
//             res.redirect('/tracker/index');
//           } else {
//             errorArray.push("Password incorrect!")
//             res.render('tracker/signin', { errors: errorArray })
//           }
//         })
//       }
//     })
//     }
// });

router.post('/tracker/milestones',function (req, res, next) {
  childCollection.insert({
    first: req.body.first,
    middle: req.body.middle,
    last: req.body.last
  }).then(function (child) {
    res.redirect('/tracker/index')
  })
});

module.exports= router;
