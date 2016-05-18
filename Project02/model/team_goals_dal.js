var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAllTeamGoals = function(number, callback) {
    connection.query('SELECT name, AVG(goals) AS avg_goals FROM Team t JOIN Player_On_Team o ON o.team_id = t.team_id JOIN Player p ON p.player_id = o.player_id GROUP BY name HAVING AVG(goals) > ' + number,
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