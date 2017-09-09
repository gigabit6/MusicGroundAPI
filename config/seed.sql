CREATE DATABASE IF NOT EXISTS `music_ground`;
USE `music_ground`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(5000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;


LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1,'admin','admin@code-nest.com','admin');

UNLOCK TABLES;
