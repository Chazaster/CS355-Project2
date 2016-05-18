var express = require('express');
var router = express.Router();
var playerDal = require('../model/player_dal');
var ratingDal = require('../model/rating_dal');
var playeronteamDal = require('../model/player_on_team_dal');

router.get('/all', function(req, res) {
    playerDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('player/player_list.ejs', {rs: result, title: "Players"});
        }
    );
});

router.get('/', function (req, res) {
    playerDal.GetByID(req.query.player_id, function (err, result) {
            if (err) throw err;
            res.render('player/player_info.ejs', {rs: result, player_id: req.query.player_id});
        }
    );
});

router.get ('/create', function (req, res, next) {
    res.render ('player/player_create.ejs');
});

router.get ('/save', function (req, res, next) {
    console.log ("firstname equals: " + req.query.p_firstname);
    console.log ("the lastname submitted was: " + req.query.p_lastname);
    console.log ("email equals: " + req.query.email);
    console.log ("password equals: " + req.query.password);
    playerDal.Insert(req.query, function (err, result) {
        var response = {};
        if(err) {
            response.message = err.message;
        }
        else {
            response.message = 'Success!';
        }
        res.json (response);
    })
});

router.get('/edit', function(req, res) {
    console.log('/edit/?player_id: ' + req.query.player_id);
    playerDal.GetByID(req.query.player_id, function (err, player_result) {
        if (err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            console.log(player_result);
            ratingDal.GetAll(function (err, rating_result) {
                console.log(rating_result);
                playeronteamDal.GetAll(function (err, player_on_team_result) {
                    console.log(player_on_team_result);
                    res.render('player/player_edit.ejs', {
                        rs: player_result,
                        rating: rating_result,
                        player_on_team: player_on_team_result,
                        message: req.query.message
                    });
                });
            });
        }
    });
});


router.post('/update_player', function(req, res) {
    console.log(req.body);
    // first update the user
    playerDal.Update(req.body.p_firstname, req.body.p_lastname, req.body.games_played, req.body.goals, req.body.assists, req.body.points, req.body.penalty_minutes, req.body.rating, req.body.player_on_team, req.body.player_id,
        function (err) {
            var message;
            if (err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'Success!';
            }
            // next update the states
            playerDal.GetByID(req.body.player_id, function (err, user_info) {
                ratingDal.GetAll(function (err, rating_result) {
                    console.log(rating_result);
                    playeronteamDal.GetAll(function (err, player_on_team_result) {
                        console.log(player_on_team_result);
                        res.send(message);
                    });
                });
            });
        });
});

router.get('/delete', function(req, res){
    console.log(req.query);
    playerDal.GetByID(req.query.player_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            playerDal.DeleteById(req.query.player_id, function (err) {
                res.send('Player ID ' + result[0].player_id + ' Successfully Deleted');
            });
        }
        else {
            res.send('Player does not exist in the database.');
        }
    });
});

module.exports = router;