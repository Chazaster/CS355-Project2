var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM Team GROUP BY name;',
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

exports.GetByID = function(team_id, callback) {
    console.log(team_id);
    var query = 'SELECT * FROM Team_View WHERE team_id = ' + team_id;
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

exports.Update = function (name, arena_name, city, state, zip, team_id, callback) {
    console.log(name, arena_name, city, state, zip, team_id);
    var values1 = [name, team_id];
    connection.query('UPDATE Team_View SET name = ? WHERE team_id = ?', values1,
        function (err, result) {
            if (err) {
                console.log(this.sql);
                callback(err);
            }
            else {
                console.log(this.sql);
                var values2 = [arena_name, team_id];
                connection.query('UPDATE Team_View SET arena_name = ? WHERE team_id = ?', values2,
                    function (err, result) {
                       if (err) {
                           callback(err);
                       }
                       else {
                           var values3 = [city, state, zip, team_id];
                           connection.query('UPDATE Team_View SET city = ?, state = ?, zip = ? WHERE team_id = ?', values3,
                                function (err, result) {
                                   if (err) {
                                       callback(err);
                                   }
                                   else {
                                       callback(false, result);
                                   }
                                });
                       }
                    });
            }
        });
};

var Delete = function (team_id, callback) {
    var values = [team_id];
    connection.query ('DELETE FROM Team WHERE team_id = ?', values,
        function (err) {
            callback (err);
        });
};

exports.DeleteById = Delete;