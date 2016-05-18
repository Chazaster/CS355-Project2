var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT * FROM Player_Rating";
    connection.query(qry, function(err, result){
        callback(err, result);
    });
};

exports.Insert = function(rating_title, callback) {
    var qry = "INSERT INTO Player_Rating (rating_title) VALUES (?)";
    connection.query(qry, rating_title, function(err, result){
        callback(err, result);
    });
};