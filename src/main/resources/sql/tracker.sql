/*
Navicat MySQL Data Transfer

Source Server         : local_dev
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : tracker

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2016-08-31 18:07:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ga_media_access_census
-- ----------------------------
DROP TABLE IF EXISTS `ga_media_access_census`;
CREATE TABLE `ga_media_access_census` (
  `id` int(11) DEFAULT NULL,
  `unionLv1` varchar(255) DEFAULT NULL,
  `pv` int(11) DEFAULT NULL,
  `uv` int(11) DEFAULT NULL,
  `orderPv` int(11) DEFAULT NULL,
  `secondClickCount` int(11) DEFAULT NULL,
  `accessDepth` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ga_user_behavior_record
-- ----------------------------
DROP TABLE IF EXISTS `ga_user_behavior_record`;
CREATE TABLE `ga_user_behavior_record` (
  `id` bigint(20) DEFAULT NULL,
  `buttonPosition` varchar(255) DEFAULT NULL,
  `linkPosition` varchar(255) DEFAULT NULL,
  `viewType` varchar(255) DEFAULT NULL,
  `newUserFlag` varchar(255) DEFAULT NULL,
  `sessionId` varchar(255) DEFAULT NULL,
  `endUserId` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `clientTime` datetime DEFAULT NULL,
  `userurgent` varchar(255) DEFAULT NULL,
  `pageUrl` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `stayTime` varchar(255) DEFAULT NULL,
  `stayTimeMilSeconds` bigint(20) DEFAULT NULL,
  `pageTitle` varchar(255) DEFAULT NULL,
  `refferPage` longtext,
  `fromWhere` varchar(255) DEFAULT NULL,
  `clientSystem` varchar(255) DEFAULT NULL,
  `clientResolution` varchar(255) DEFAULT NULL,
  `clientPageType` varchar(255) DEFAULT NULL,
  `serachKeyWords` varchar(255) DEFAULT NULL,
  `stringDate` varchar(10) DEFAULT NULL,
  UNIQUE KEY `id` (`id`) USING BTREE,
  KEY `stringDate` (`stringDate`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

