var express = require('express');
var router = express.Router();
var team_goals_Dal = require('../model/team_goals_dal');

router.get('/team_goals_all', function (req, res) {
    /*team_goals_Dal.GetAllTeamGoals(function (err, result) {
        if (err) throw err;*/
        res.render('team/team_goals.ejs', {title: "Team Goals"});
});

router.post('/find_team', function (req, res) {
    console.log(req.body);
    team_goals_Dal.GetAllTeamGoals(req.body.number, function (err, body_result) {
            var message;
            if (err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                console.log(body_result);
                res.render('team/find_team_goals.ejs', {rs: body_result, title: "Found Team Goals"});
            }
        });
});

module.exports = router;