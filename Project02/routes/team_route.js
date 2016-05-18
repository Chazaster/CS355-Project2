var express = require('express');
var router = express.Router();
var teamDal = require('../model/team_dal');

router.get('/all', function(req, res) {
    teamDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('team/team_list.ejs', {rs: result, title: "Teams"});
        }
    );
});

router.get('/', function (req, res) {
    teamDal.GetByID(req.query.team_id, function (err, result) {
            if (err) throw err;
            res.render('team/team_info.ejs', {rs: result, team_id: req.query.team_id});
        }
    );
});

router.get('/edit', function(req, res){
    console.log('/edit/?team_id: ' + req.query.team_id);
    teamDal.GetByID(req.query.team_id, function(err, team_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            console.log(team_result);
            res.render('team/team_edit.ejs', {rs: team_result, message: req.query.message});
        }
    });
});

router.post('/update_team', function(req, res){
    console.log(req.body);
    teamDal.Update(req.body.name, req.body.arena_name, req.body.city, req.body.state, req.body.zip, req.body.team_id,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'Success!';
            }
            // next update the states
            teamDal.GetByID(req.body.team_id, function(err, user_info){
                res.send(message);
            });
        });

});


router.get('/delete', function(req, res){
    console.log(req.query);
    teamDal.GetByID(req.query.team_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            teamDal.DeleteById(req.query.team_id, function (err) {
                res.send('Team ID ' + result[0].team_id + ' Successfully Deleted');
            });
        }
        else {
            res.send('Team does not exist in the database.');
        }
    });
});

module.exports = router;