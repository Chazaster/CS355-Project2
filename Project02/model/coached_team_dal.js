var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT DISTINCT name, team_id from Coach_View GROUP BY name";
    connection.query(qry, function(err, result){
        callback(err, result);
    });
};

exports.Insert = function(coach_id, team_id, callback) {
    var qry = "INSERT INTO Coached_Team (coach_id, team_id) VALUES (?, ?)";
    connection.query(qry, coach_id, team_id, function(err, result){
        callback(err, result);
    });
};