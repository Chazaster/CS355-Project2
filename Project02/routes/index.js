var express = require('express');
var router = express.Router();
var playerDal = require('../model/player_dal');

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = {
    title: 'NHL Database',
    subtitle: 'Project 2'
  };
  if (req.session.account === undefined) {
    res.render ('index', data);
  }
  else {
    data.p_firstname = req.session.account.p_firstname;
    res.render ('index', data);
  }
});

router.get('/authenticate', function(req, res) {
  playerDal.GetByEmail(req.query.email, req.query.password, function (err, account) {
    if (err) {
      res.send(err);
    }
    else if (account == null) {
      res.send("Player account not found.");
    }
    else {
      req.session.account = account;
      res.send(account);
    }
  });
});

router.get('/login', function(req, res) {
  res.render('authentication/login.ejs');
});

router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('authentication/logout.ejs');
  });
});

module.exports = router;
