CREATE DATABASE cow;

USE cow;

CREATE TABLE cows (

  id int NOT NULL AUTO_INCREMENT,
  name varchar(40) UNIQUE,
  description varchar(512) NOT NULL,
  PRIMARY KEY (ID)
);


-- mysql -u root < server/schema.sql

