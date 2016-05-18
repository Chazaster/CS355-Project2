var mysql = require('mysql');
var db = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM General_Manager;',
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

exports.GetByID = function(gm_id, callback) {
    console.log(gm_id);
    var query = 'SELECT * FROM GM_View WHERE gm_id = ' + gm_id;
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

exports.Update = function (firstname, lastname, team_id, years_owned, gm_id, callback) {
    console.log(firstname, lastname, team_id, years_owned, gm_id);
    var values1 = [firstname, lastname, gm_id];
    connection.query('UPDATE General_Manager SET firstname = ?, lastname = ? WHERE gm_id = ?', values1,
        function (err, result) {
            if (err) {
                console.log(this.sql);
                callback(err);
            }
            else {
                console.log(this.sql);
                var values2 = [team_id, years_owned, gm_id];
                connection.query('UPDATE Owned_Team SET team_id = ?, years_owned = ? WHERE gm_id = ?', values2,
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

var Delete = function (gm_id, callback) {
    var qry = 'DELETE FROM General_Manager WHERE gm_id = ?';
    connection.query (qry, [gm_id],
        function (err) {
            callback (err);
        });
};

exports.DeleteById = Delete;

