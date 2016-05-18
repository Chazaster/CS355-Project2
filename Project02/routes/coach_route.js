var express = require('express');
var router = express.Router();
var coachDal = require('../model/coach_dal');
var coachedteamDal = require('../model/coached_team_dal');

router.get('/all', function(req, res) {
    coachDal.GetAll(function (err, result) {
            if (err) throw err;
            res.render('coach/coaches_list.ejs', {rs: result, title: "Coaches"});
        }
    );
});

router.get('/', function (req, res) {
    coachDal.GetByID(req.query.coach_id, function (err, result) {
            if (err) throw err;
            res.render('coach/coaches_info.ejs', {rs: result, coach_id: req.query.coach_id});
        }
    );
});

router.get('/edit', function(req, res){
    console.log('/edit/?coach_id: ' + req.query.coach_id);
    coachDal.GetByID(req.query.coach_id, function(err, coach_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            console.log(coach_result);
            coachedteamDal.GetAll(function (err, coached_team_result) {
                console.log(coached_team_result);
                res.render('coach/coaches_edit.ejs', {
                    rs: coach_result,
                    coached_team: coached_team_result,
                    message: req.query.message
                });
            });
        }
    });
});

router.post('/update_coach', function(req, res){
    console.log(req.body);
    coachDal.Update(req.body.firstname, req.body.lastname, req.body.games_coached, req.body.wins, req.body.losses, req.body.coached_team, req.body.coach_id,
        function(err){
            var message;
            if(err) {
                console.log(err);
                message = 'error: ' + err.message;
            }
            else {
                message = 'Success!';
            }
            // next update the coached teams
            coachDal.GetByID(req.body.coach_id, function(err, user_info){
                coachedteamDal.GetAll(function (err, coached_team_result) {
                    console.log(coached_team_result, "You have successfully edited the team the coach coached");
                    res.send(message);
                });
            });
        });

});


router.get('/delete', function(req, res){
    console.log(req.query);
    coachDal.GetByID(req.query.coach_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            coachDal.DeleteById(req.query.coach_id, function (err) {
                res.send('Coach ID ' + result[0].coach_id + ' Successfully Deleted');
            });
        }
        else {
            res.send('Coach does not exist in the database.');
        }
    });
});

module.exports = router;