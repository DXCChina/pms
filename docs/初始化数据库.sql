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
CREATE DATABASE IF NOT EXISTS `pms` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pms`;

-- 导出  表 pms.demand 结构
CREATE TABLE IF NOT EXISTS `demand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `title` char(50) NOT NULL,
  `detail` longtext DEFAULT NULL,
  `level` char(50) NOT NULL DEFAULT 'normal' COMMENT 'low(低)/high(高)/normal(中,默认)',
  `status` char(50) NOT NULL DEFAULT 'active' COMMENT 'active(默认)/done/delete',
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `startDate` char(50) NOT NULL,
  `endDate` char(50) DEFAULT NULL,
  `progress` int(11) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 pms.project 结构
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

-- 数据导出被取消选择。
-- 导出  表 pms.projectmember 结构
CREATE TABLE IF NOT EXISTS `projectmember` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `projectId` int(10) unsigned NOT NULL,
  `memberId` int(10) unsigned NOT NULL,
  `role` char(10) NOT NULL COMMENT 'pm/dev/test',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='项目与成员关系表';

-- 数据导出被取消选择。
-- 导出  表 pms.task 结构
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

-- 数据导出被取消选择。
-- 导出  表 pms.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(50) NOT NULL,
  `password` char(100) NOT NULL,
  `email` char(50) NOT NULL,
  `status` char(50) NOT NULL DEFAULT 'active' COMMENT '用户状态:active(默认)/delete(已删除)',
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username` (`username`),
  UNIQUE KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
