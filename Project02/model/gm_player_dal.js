var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAllGMs = function(callback) {
    connection.query('SELECT player_id, p_firstname, p_lastname, games_played, goals, assists, points FROM Player WHERE EXISTS (SELECT firstname, lastname FROM General_Manager WHERE Player.p_lastname = General_Manager.lastname)',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            // Weird error when console.log is ran, comment out to get correct result
            //console.log(result);
            callback(false, result);
        }
    );
};