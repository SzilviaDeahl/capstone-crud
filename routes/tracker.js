var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/developmentTracker');
var childCollection = db.get('devtrack');

router.get('/tracker/index', function (req, res, next) {
  res.render('tracker/index')
});

router.get('/tracker/milestones', function (req, res, next) {
  res.render('tracker/milestones')
});

module.exports= router;
