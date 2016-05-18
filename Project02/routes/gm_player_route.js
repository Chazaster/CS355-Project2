var express = require('express');
var router = express.Router();
var gm_player_Dal = require('../model/gm_player_dal');

router.get('/gm_all', function (req, res) {
    gm_player_Dal.GetAllGMs(function (err, result) {
        if (err) throw err;
        res.render('general_manager/gm_player_list.ejs', {rs: result, title: "General Managers/Players"});
    });
});

module.exports = router;