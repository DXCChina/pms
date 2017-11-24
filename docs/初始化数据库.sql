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

-- 导出  表 pms.activity 结构
CREATE TABLE IF NOT EXISTS `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) NOT NULL,
  `detail` longtext DEFAULT NULL,
  `memberId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `progress` int(11) DEFAULT NULL,
  `cost` int(11) DEFAULT NULL,
  `status` char(10) NOT NULL DEFAULT 'new' COMMENT 'new(新建,未分配),dev-ing(开发中),needtest(开发完待测试),test-ing(测试中),fix-ing(修复中),finish(已完成),close(已关闭)',
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `startDate` datetime NOT NULL DEFAULT current_timestamp(),
  `endDate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 pms.demand 结构
CREATE TABLE IF NOT EXISTS `demand` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(50) NOT NULL,
  `detail` longtext DEFAULT NULL,
  `level` char(10) NOT NULL DEFAULT 'normal' COMMENT 'low(低)/high(高)/normal(中,默认)',
  `projectId` int(11) NOT NULL,
  `activityId` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0(未完成)/1(已完成)',
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 pms.project 结构
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `detail` longtext DEFAULT NULL,
  `ownerId` int(11) NOT NULL,
  `status` char(10) NOT NULL DEFAULT 'active' COMMENT 'active(默认)/done/delete',
  `createAt` datetime NOT NULL DEFAULT current_timestamp(),
  `startDate` datetime NOT NULL DEFAULT current_timestamp(),
  `endDate` datetime DEFAULT NULL,
  `type` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `project_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 pms.project_member 结构
CREATE TABLE IF NOT EXISTS `project_member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `memberId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `role` char(10) NOT NULL DEFAULT 'dev' COMMENT '用户角色:dev/test',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 pms.test_case 结构
CREATE TABLE IF NOT EXISTS `test_case` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `detail` longtext DEFAULT NULL,
  `demandId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `type` char(10) DEFAULT NULL,
  `input` char(50) NOT NULL,
  `expect` char(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 pms.test_result 结构
CREATE TABLE IF NOT EXISTS `test_result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) NOT NULL,
  `detail` longtext DEFAULT NULL,
  `caseId` int(11) NOT NULL,
  `output` char(50) NOT NULL,
  `result` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0(bug)/1(正常)',
  `status` char(10) NOT NULL DEFAULT 'close' COMMENT 'tofix,tocheck,close(默认)',
  `level` char(10) NOT NULL DEFAULT 'normal' COMMENT '优先级:low(低)/high(高)/normal(中,默认)',
  `devId` int(11) NOT NULL,
  `priority` char(10) NOT NULL DEFAULT 'normal' COMMENT '严重程度:low(低)/high(高)/normal(中,默认)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 pms.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` char(50) NOT NULL,
  `password` char(100) NOT NULL,
  `email` char(50) NOT NULL,
  `status` char(10) NOT NULL DEFAULT 'active' COMMENT '用户状态:active(默认)/delete(已删除)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username` (`username`),
  UNIQUE KEY `user_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
