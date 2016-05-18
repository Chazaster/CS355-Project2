var express = require('express');
var router = express.Router();
var gmDal = require('../model/general_manager_dal');
var ownedteamDal = require('../model/owned_team_dal');

router.get('/all', function(req, res) {
    gmDal.GetAll(function (err, result) {
        if (err) throw err;
        res.render('general_manager/general_manager_list.ejs', {rs: result, title: "General Managers"});
    });
});

router.get('/', function (req, res) {
    gmDal.GetByID(req.query.gm_id, function (err, result) {
            if (err) throw err;
            res.render('general_manager/general_manager_info.ejs', {rs: result, gm_id: req.query.gm_id});
        }
    );
});

router.get('/edit', function(req, res){
    console.log('/edit/?gm_id: ' + req.query.gm_id);
    gmDal.GetByID(req.query.gm_id, function(err, gm_result){
        if(err) {
            console.log(err);
            res.send('error: ' + err);
        }
        else {
            console.log(gm_result);
            ownedteamDal.GetAll(function (err, owned_team_result) {
               console.log(owned_team_result);
                res.render('general_manager/general_manager_edit.ejs', {rs: gm_result, owned_team: owned_team_result, message: req.query.message});
            });
        }
    });
});

router.post('/update_general_manager', function(req, res){
    console.log(req.body);
    gmDal.Update(req.body.firstname, req.body.lastname, req.body.owned_team, req.body.years_owned, req.body.gm_id,
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
            gmDal.GetByID(req.body.gm_id, function(err, user_info){
                ownedteamDal.GetAll(function (err, owned_team_result) {
                    console.log(owned_team_result);
                    res.send(message);
                });
            });
        });

});


router.get('/delete', function(req, res){
    console.log(req.query);
    gmDal.GetByID(req.query.gm_id, function(err, result) {
        if(err){
            res.send("Error: " + err);
        }
        else if(result.length != 0) {
            gmDal.DeleteById(req.query.gm_id, function (err) {
                res.send('General Manager ID ' + result[0].gm_id + ' Successfully Deleted');
            });
        }
        else {
            res.send('General Manager does not exist in the database.');
        }
    });
});

module.exports = router;