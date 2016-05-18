var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT DISTINCT team_id, name FROM Player_Rating_View GROUP BY name";
    connection.query(qry, function(err, result){
        callback(err, result);
    });
};

exports.Insert = function(player_id, team_id, callback) {
    var qry = "INSERT INTO Player_On_Team (player_id, team_id) VALUES (?, ?)";
    connection.query(qry, player_id, team_id, function(err, result){
        callback(err, result);
    });
};