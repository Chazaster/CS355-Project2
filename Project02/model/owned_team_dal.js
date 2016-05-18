var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT team_id, name FROM Owned_Team_View";
    connection.query(qry, function(err, result){
        callback(err, result);
    });
};