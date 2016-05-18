var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM Coach;',
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

exports.GetByID = function(coach_id, callback) {
    console.log(coach_id);
    var query = 'SELECT * FROM Coach_View WHERE coach_id = ' + coach_id;
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

exports.Update = function (firstname, lastname, games_coached, wins, losses, team_id, coach_id, callback) {
    console.log(firstname, lastname, games_coached, wins, losses, team_id, coach_id);
    var values = [firstname, lastname, games_coached, wins, losses, coach_id];
    connection.query('UPDATE Coach SET firstname = ?, lastname = ?, games_coached = ?, wins = ?, losses = ? WHERE coach_id = ?', values,
        function (err, result) {
            if (err) {
                console.log(this.sql);
                callback(err);
            }
            else {
                console.log(this.sql);
                var values = [team_id, coach_id];
                connection.query('UPDATE Coached_Team SET team_id = ? WHERE coach_id = ?', values,
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

var Delete = function (coach_id, callback) {
    var qry = 'DELETE FROM Coach WHERE coach_id = ?';
    connection.query (qry, [coach_id],
        function (err) {
            callback (err);
        });
};

exports.DeleteById = Delete;