use cwatson;

DROP TABLE IF EXISTS Player_Rating;

CREATE TABLE Player_Rating (rating_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
							rating_title VARCHAR (50));
                            
INSERT INTO Player_Rating (rating_title) VALUES 
('Disgusting'),
('Horrible'),
('Not so horrible'),
('Getting better'),
('Average'),
('Par'),
('Good'),
('Great'),
('Excellent'),
('Legendary');

SELECT * FROM Player_Rating;

/* Queries that were created from Lab 11 and used in Project 2 */

DROP PROCEDURE IF EXISTS Player_GetByEmail;
DELIMITER //
	CREATE PROCEDURE Player_GetByEmail (_email VARCHAR(256), _password VARCHAR(256))
	BEGIN
		SELECT player_id, email, p_firstname, p_lastname FROM Player WHERE email = _email AND password = _password;
	END //
DELIMITER ;

CALL Player_GetByEmail('great', 'one');

/* Views and other queries used for Project 2 */

CREATE OR REPLACE VIEW Owned_Team_View AS
SELECT t.team_id, name, firstname, lastname, years_owned FROM General_Manager g
JOIN Owned_Team o ON o.gm_id = g.gm_id
JOIN Team t ON t.team_id = o.team_id
ORDER BY name ASC;

SELECT * FROM Owned_Team_View;

CREATE OR REPLACE VIEW Player_Rating_View AS
SELECT p.*, t.team_id, name, rating_title FROM Player p
LEFT JOIN Player_On_Team o ON o.player_id = p.player_id
LEFT JOIN Player_Rating r ON r.rating_id = p.rating_id
LEFT JOIN Team t ON t.team_id = o.team_id;

SELECT * FROM Player_Rating_View;

UPDATE Player SET rating_id = 5 WHERE player_id = 1;

CREATE OR REPLACE VIEW GM_View AS
SELECT g.*, t.team_id, name, years_owned FROM Owned_Team o
JOIN General_Manager g ON g.gm_id = o.gm_id
JOIN Team t ON t.team_id = o.team_id
GROUP BY name;

SELECT * FROM GM_View;

CREATE OR REPLACE VIEW Team_View AS
SELECT t.*, arena_name, city, state, zip FROM Team t
JOIN Team_Location l ON l.team_id = t.team_id
JOIN Arena a ON a.team_id = t.team_id;

SELECT * FROM Team_View;

CREATE OR REPLACE VIEW Coach_View AS
SELECT c.*, t.team_id, name FROM Coach c
JOIN Coached_Team o ON o.coach_id = c.coach_id
JOIN Team t ON t.team_id = o.team_id;

SELECT * FROM Coach_View;

#### Aggregate Function Query ####
SELECT name, AVG(goals) AS avg_goals FROM Team t
JOIN Player_On_Team o ON o.team_id = t.team_id
JOIN Player p ON p.player_id = o.player_id
GROUP BY name
HAVING AVG(goals) > 600;

#### Subquery ####
SELECT player_id, p_firstname, p_lastname, games_played, goals, assists, points FROM Player
WHERE EXISTS (
	SELECT firstname, lastname FROM General_Manager WHERE Player.p_lastname = General_Manager.lastname
);
