CREATE DATABASE cowlist;

USE cowlist;

/* Create Table for the COWLIST */

CREATE TABLE cows (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  description VARCHAR(250),
  PRIMARY KEY (id) 
);

/* Insert records to the cows table*/

INSERT INTO cows (name, description) VALUES ('Buttercup', 'A fat cow');
INSERT INTO cows (name, description) VALUES ('Daisy', 'A skinny cow');
INSERT INTO cows (name, description) VALUES ('Flory', 'A cow that loves flowers');
INSERT INTO cows (name, description) VALUES ('Mighty', 'A cow that loves to eat grass');
