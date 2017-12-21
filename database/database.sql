CREATE DATABASE MY_NODE_DB;

USE MY_NODE_DB;

DROP TABLE IF EXISTS `zr_version_tb`;

CREATE TABLE `zr_version_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(250) COLLATE utf8_bin DEFAULT NULL,
  `value` longtext COLLATE utf8_bin,
  `timestamp` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
