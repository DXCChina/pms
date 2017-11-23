-- --------------------------------------------------------
-- 主机:                           122.115.49.94
-- 服务器版本:                        10.2.9-MariaDB - MariaDB Server
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  9.4.0.5174
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 pms 的数据库结构
DROP DATABASE IF EXISTS `pms`;
CREATE DATABASE IF NOT EXISTS `pms` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pms`;

-- 导出  表 pms.demand 结构
DROP TABLE IF EXISTS `demand`;
CREATE TABLE IF NOT EXISTS `demand` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ownerId` int(10) unsigned NOT NULL,
  `projectId` int(10) unsigned NOT NULL,
  `title` char(50) NOT NULL,
  `detail` tinytext DEFAULT NULL,
  `level` char(50) NOT NULL DEFAULT 'normal' COMMENT 'low(低)/high(高)/normal(中,默认)',
  `status` char(50) NOT NULL DEFAULT 'active' COMMENT 'active(默认)/done/delete',
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `startDate` char(50) NOT NULL,
  `endDate` char(50) DEFAULT NULL,
  `progress` int(11) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8 COMMENT='需求表';

-- 正在导出表  pms.demand 的数据：~0 rows (大约)
DELETE FROM `demand`;
/*!40000 ALTER TABLE `demand` DISABLE KEYS */;
INSERT INTO `demand` (`id`, `ownerId`, `projectId`, `title`, `detail`, `level`, `status`, `createAt`, `startDate`, `endDate`, `progress`, `cost`) VALUES
	(1, 1, 1, 'demo', 'demo', 'normal', 'active', '2017-10-26 17:45:00', '2017-10-26', '2017-10-26', 10, 10);
/*!40000 ALTER TABLE `demand` ENABLE KEYS */;

-- 导出  表 pms.project 结构
DROP TABLE IF EXISTS `project`;
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `detail` tinytext DEFAULT NULL,
  `ownerId` int(10) unsigned NOT NULL,
  `status` char(50) NOT NULL DEFAULT 'active' COMMENT 'active(默认)/done/delete',
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='项目表';

-- 正在导出表  pms.project 的数据：~0 rows (大约)
DELETE FROM `project`;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` (`id`, `name`, `detail`, `ownerId`, `status`, `createAt`) VALUES
	(1, 'test demo', 'description', 1, 'active', '2017-10-26 17:47:05');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;

-- 导出  表 pms.projectmember 结构
DROP TABLE IF EXISTS `projectmember`;
CREATE TABLE IF NOT EXISTS `projectmember` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `projectId` int(10) unsigned NOT NULL,
  `memberId` int(10) unsigned NOT NULL,
  `role` char(10) NOT NULL COMMENT 'pm/dev/test',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='项目与成员关系表';

-- 正在导出表  pms.projectmember 的数据：~0 rows (大约)
DELETE FROM `projectmember`;
/*!40000 ALTER TABLE `projectmember` DISABLE KEYS */;
INSERT INTO `projectmember` (`id`, `projectId`, `memberId`, `role`) VALUES
	(1, 1, 1, 'pm');
/*!40000 ALTER TABLE `projectmember` ENABLE KEYS */;

-- 导出  表 pms.task 结构
DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ownerId` int(10) unsigned NOT NULL,
  `memberId` int(10) unsigned NOT NULL,
  `demandId` int(10) unsigned NOT NULL,
  `title` char(50) NOT NULL,
  `detail` tinytext DEFAULT NULL,
  `level` char(50) NOT NULL DEFAULT 'normal' COMMENT 'low(低)/high(高)/normal(中,默认)',
  `status` char(50) NOT NULL DEFAULT 'active' COMMENT 'active(进行中,默认)/test(测试中)/fix(修复中)/done(已完成)/delete(已删除)',
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `startDate` char(50) NOT NULL,
  `endDate` char(50) DEFAULT NULL,
  `progress` int(10) DEFAULT NULL,
  `cost` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='任务表';

-- 正在导出表  pms.task 的数据：~0 rows (大约)
DELETE FROM `task`;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` (`id`, `ownerId`, `memberId`, `demandId`, `title`, `detail`, `level`, `status`, `createAt`, `startDate`, `endDate`, `progress`, `cost`) VALUES
	(1, 1, 1, 1, 'test', 'test', 'normal', 'active', '2017-10-26 17:46:14', '2017-10-26', '2017-10-26', 10, 26);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;

-- 导出  表 pms.user 结构
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` char(50) NOT NULL,
  `password` char(100) NOT NULL,
  `email` char(50) NOT NULL,
  `status` char(50) NOT NULL DEFAULT 'active' COMMENT '用户状态:active(默认)/delete(已删除)',
  `createAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- 正在导出表  pms.user 的数据：~0 rows (大约)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `status`, `createAt`) VALUES
	(1, 'test', '$argon2i$v=19$m=512,t=2,p=2$EwIAIGRsTemd8z7nHIPQug$KbcxtDvE4gEV3aUDingkdw', 'test@test.test', 'active', '2017-11-22 14:02:51');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
