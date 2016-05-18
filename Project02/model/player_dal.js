var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM Player;',
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

exports.GetByID = function(player_id, callback) {
    console.log(player_id);
    var query = 'SELECT * FROM Player_Rating_View WHERE player_id = ' + player_id;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};

exports.Insert = function(account_info, callback) {
    var dynamic_query = 'INSERT INTO Player (p_firstname, p_lastname, email, password) VALUES (' +
        '\'' + account_info.p_firstname + '\', ' +
        '\'' + account_info.p_lastname + '\', ' +
        '\'' + account_info.email + '\', ' +
        '\'' + account_info.password + '\'' +
        ');';
    console.log(dynamic_query);
    connection.query(dynamic_query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                //return;
            }
            callback(false, result);
        }
    )
};

exports.Update = function (p_firstname, p_lastname, games_played, goals, assists, points, penalty_minutes, rating_id, team_id, player_id, callback) {
    console.log(p_firstname, p_lastname, games_played, goals, assists, points, penalty_minutes, rating_id, team_id, player_id);
    var values = [p_firstname, p_lastname, games_played, goals, assists, points, penalty_minutes, rating_id, player_id];
    connection.query('UPDATE Player_Rating_View SET p_firstname = ?, p_lastname = ?, games_played = ?, goals = ?, assists = ?, points = ?, penalty_minutes = ?, rating_id = ? WHERE player_id = ?', values,
        function (err, result) {
            if (err) {
                console.log(this.sql);
                callback(err);
            }
            else {
                console.log(this.sql);
                var values = [team_id, player_id];
                connection.query('UPDATE Player_On_Team SET team_id = ? WHERE player_id = ?', values,
                    function (err, result) {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback(false);
                        }
                    });
            }
        });
};

// Added from Lab 11, used for Project 2
exports.GetByEmail = function(email, password, callback) {
    var query = 'CALL Player_GetByEmail (?, ?)';
    var query_data = [email, password];

    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
        // NOTE: Stored Procedure results are wrapped in an extra array
        // and only one user record should be returned, so return only the one result
        else if(result[0].length == 1) {
            callback(err, result[0][0]);
        }
        else {
            callback(err, null);
        }
    });
};

var Delete = function (player_id, callback) {
    var qry = 'DELETE FROM Player WHERE player_id = ?';
    connection.query (qry, [player_id],
        function (err) {
            callback (err);
        });
};

exports.DeleteById = Delete;