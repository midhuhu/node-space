/*
 Navicat Premium Data Transfer

 Source Server         : 本地MySQL
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : saas_basic

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 26/03/2024 08:37:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for casbin_rules
-- ----------------------------
DROP TABLE IF EXISTS `casbin_rules`;
CREATE TABLE `casbin_rules`  (
  `id` bigint(0) NOT NULL AUTO_INCREMENT,
  `ptype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `v0` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `v1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `v2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `v3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `v4` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `v5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of casbin_rules
-- ----------------------------

-- ----------------------------
-- Table structure for ent_types
-- ----------------------------
DROP TABLE IF EXISTS `ent_types`;
CREATE TABLE `ent_types`  (
  `id` bigint(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ent_types
-- ----------------------------
-- INSERT INTO `ent_types` VALUES (4, 'fms_file');

-- ----------------------------
-- Table structure for fms_file
-- ----------------------------
DROP TABLE IF EXISTS `fms_file`;
CREATE TABLE `fms_file`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'File\'s UUID | 文件的UUID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'File\'s name | 文件展示名称',
  `origin_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'File\'s origin name | 文件原始名称',
  `file_type` tinyint(0) UNSIGNED NOT NULL COMMENT 'File\'s type | 文件类型',
  `size` bigint(0) UNSIGNED NOT NULL COMMENT 'File\'s size |  文件大小',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'File\'s path | 文件相对路径',
  `hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'The hash of the file | 文件的 hash',
  `open_status` tinyint(0) UNSIGNED NULL DEFAULT 1 COMMENT 'status 1 private 2 public | 状态 1 私有 2 公开',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Tenant ID',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'User\'s ID | 用户ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of fms_file
-- ----------------------------
-- INSERT INTO `fms_file` VALUES ('464338945384151273', '2023-06-09 07:52:59', '2023-06-09 07:52:59', 0, 0, NULL, '01889f24-f336-738a-82e9-09a5bc88908a', '首页.png', '首页.png', 2, 300057, '/fms.api/image/2023-06-09/01889f24-f336-738a-82e9-09a5bc88908a.png', 'c07cb981bb60b406d7fa523fc5a29cb511f5327661ed5a681f23ad7801964572', 2, '464198433314601193', '464311189476767977');

-- ----------------------------
-- Table structure for role_apis
-- ----------------------------
DROP TABLE IF EXISTS `role_apis`;
CREATE TABLE `role_apis`  (
  `role_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `api_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`role_id`, `api_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_apis
-- ----------------------------
-- INSERT INTO `role_apis` VALUES ('464198433314666729', '464198433448687849');

-- ----------------------------
-- Table structure for role_buttons
-- ----------------------------
DROP TABLE IF EXISTS `role_buttons`;
CREATE TABLE `role_buttons`  (
  `role_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `button_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`role_id`, `button_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_buttons
-- ----------------------------
-- INSERT INTO `role_buttons` VALUES ('464198433314666729', '464198433434138857');

-- ----------------------------
-- Table structure for role_groups
-- ----------------------------
DROP TABLE IF EXISTS `role_groups`;
CREATE TABLE `role_groups`  (
  `role_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `group_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`role_id`, `group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_groups
-- ----------------------------

-- ----------------------------
-- Table structure for role_menus
-- ----------------------------
DROP TABLE IF EXISTS `role_menus`;
CREATE TABLE `role_menus`  (
  `role_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `menu_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menus
-- ----------------------------
-- INSERT INTO `role_menus` VALUES ('464198433314666729', '464198433432238313');

-- ----------------------------
-- Table structure for role_users
-- ----------------------------
DROP TABLE IF EXISTS `role_users`;
CREATE TABLE `role_users`  (
  `role_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_users
-- ----------------------------
-- INSERT INTO `role_users` VALUES ('464198433314666729', '464311189476767977');

-- ----------------------------
-- Table structure for saas_api
-- ----------------------------
DROP TABLE IF EXISTS `saas_api`;
CREATE TABLE `saas_api`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'API path | API 路径',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'API description | API 描述',
  `api_group` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'API group | API 分组',
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'POST' COMMENT 'HTTP method | HTTP 请求类型',
  `tenant_apis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `api_path_method`(`path`, `method`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_api
-- ----------------------------
-- INSERT INTO `saas_api` VALUES ('464198433448687849', '2023-06-08 08:37:07', '2023-06-08 08:37:07', 1, NULL, '/saas/api/v1/auth/login', 'apiDesc.Login', 'auth', 'POST', NULL);

-- ----------------------------
-- Table structure for saas_application
-- ----------------------------
DROP TABLE IF EXISTS `saas_application`;
CREATE TABLE `saas_application`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT 'app name | 应用名',
  `app_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'APP ID',
  `secret` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'secret | 应用密钥',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT 'remark | 备注',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Tenant ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `app_id`(`app_id`) USING BTREE,
  UNIQUE INDEX `application_app_id`(`app_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_application
-- ----------------------------

-- ----------------------------
-- Table structure for saas_button
-- ----------------------------
DROP TABLE IF EXISTS `saas_button`;
CREATE TABLE `saas_button`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'name | 按钮名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'code | 按钮CODE',
  `menu_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'Menu ID | 菜单ID',
  `tenant_buttons` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_button
-- ----------------------------
-- INSERT INTO `saas_button` VALUES ('464198433432828137', '2023-06-08 08:37:07', '2023-06-27 01:36:15', 0, NULL, '新增', 'add', '464198433432041705', NULL);

-- ----------------------------
-- Table structure for saas_group
-- ----------------------------
DROP TABLE IF EXISTS `saas_group`;
CREATE TABLE `saas_group`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Position Name | 组名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'The code of position | 组编码',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'Remark | 备注',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Tenant ID',
  `group_type_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'GroupType ID | 组类型ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `group_code`(`code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_group
-- ----------------------------
-- INSERT INTO `saas_group` VALUES ('466801699646896361', '2023-06-26 07:38:15', '2023-06-26 09:52:04', 1, 0, NULL, '用户组名称1', '1212', '', '464198433314601193', '466801668860705001');

-- ----------------------------
-- Table structure for saas_group_type
-- ----------------------------
DROP TABLE IF EXISTS `saas_group_type`;
CREATE TABLE `saas_group_type`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Position Name | 组分类名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'The code of group type | 组分类编码',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'Remark | 备注',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Tenant ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `grouptype_code`(`code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_group_type
-- ----------------------------
-- INSERT INTO `saas_group_type` VALUES ('466801668860705001', '2023-06-26 07:37:57', '2023-06-26 07:37:57', 1, 0, NULL, '组类型1', '111', '', '464198433314601193');

-- ----------------------------
-- Table structure for saas_menu
-- ----------------------------
DROP TABLE IF EXISTS `saas_menu`;
CREATE TABLE `saas_menu`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'menu name | 菜单名称',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'menu title | 菜单标题',
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'menu icon | 菜单图标',
  `menu_type` int(0) UNSIGNED NOT NULL COMMENT 'menu type | 菜单类型 （菜单或目录）0 目录 1 菜单',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'index path | 菜单路由路径',
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'redirect path | 跳转路径 （外链）',
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'the path of vue file | 组件路径',
  `is_active` tinyint(1) NULL DEFAULT 1 COMMENT 'is_active | 是否激活',
  `hidden` tinyint(1) NULL DEFAULT 0 COMMENT 'hidden | 是否隐藏',
  `hidden_in_tab` tinyint(1) NULL DEFAULT 0 COMMENT 'hidden_in_tab | 是否隐藏标签',
  `fixed` tinyint(1) NULL DEFAULT 0 COMMENT 'fixed | Fixed',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'remark | 备注',
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT 'meta data | 菜单Meta信息',
  `parent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'parent menu ID | 父菜单ID',
  `tenant_menus` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_menu
-- ----------------------------
-- INSERT INTO `saas_menu` VALUES ('464198433431976169', '2023-06-08 08:37:07', '2023-06-20 03:23:44', 0, '2023-06-20 03:23:44', 'Demo', 'demo', 'menus-menu', 0, 'demo', '', '', 1, 0, 0, 0, '', '{}', NULL, NULL);

-- ----------------------------
-- Table structure for saas_organization
-- ----------------------------
DROP TABLE IF EXISTS `saas_organization`;
CREATE TABLE `saas_organization`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Organization name | 部门名称',
  `ancestors` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Parents\' IDs | 父级列表',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Code | 组织架构节点编码（可作为扩展其他用户体系，比如钉钉，企业微信等）',
  `node_type` int(0) UNSIGNED NOT NULL COMMENT 'Node type | 组织架构类型 （单位或部门）0 单位 1 部门',
  `leader` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Organization leader | 部门负责人',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Leader\'s phone number | 负责人电话',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Leader\'s email | 部门负责人电子邮箱',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Remark | 备注',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Tenant ID',
  `parent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'Parent organization ID | 父级部门ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_organization
-- ----------------------------
-- INSERT INTO `saas_organization` VALUES ('465055295362595049', '2023-06-14 06:29:17', '2024-01-17 07:57:08', 1, 0, NULL, '测试单位', '', 'csdw', 0, '', '', '', '', '464198433314601193', NULL);

-- ----------------------------
-- Table structure for saas_organization_user_info
-- ----------------------------
DROP TABLE IF EXISTS `saas_organization_user_info`;
CREATE TABLE `saas_organization_user_info`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT 'Extra information | 额外信息(json对象格式存储，用于存储的额外展示信息)',
  `organization_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Organization ID | 组织架构 ID',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'User ID | 用户 ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_organization_user_info
-- ----------------------------
-- INSERT INTO `saas_organization_user_info` VALUES ('465060037878905065', '2023-06-14 07:16:24', '2023-06-14 07:16:24', 1, NULL, '{}', '465055295362595049', '465053699748690153');

-- ----------------------------
-- Table structure for saas_position
-- ----------------------------
DROP TABLE IF EXISTS `saas_position`;
CREATE TABLE `saas_position`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Position Name | 职位名称',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'The code of position | 职位编码',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'Remark | 备注',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Tenant ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `position_code`(`code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_position
-- ----------------------------
-- INSERT INTO `saas_position` VALUES ('465055377822611689', '2023-06-14 06:30:06', '2023-06-26 07:41:32', 1, 0, NULL, '测试职位', 'cszw', '', '464198433314601193');

-- ----------------------------
-- Table structure for saas_role
-- ----------------------------
DROP TABLE IF EXISTS `saas_role`;
CREATE TABLE `saas_role`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT 'role name | 角色名',
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'role code for permission control in front end | 角色码，用于前端权限控制',
  `uid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'UUID',
  `default_router` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'dashboard' COMMENT 'default menu : dashboard | 默认登录页面',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT 'remark | 备注',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Tenant ID',
  `parent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'Parent role ID | 父级角色ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `code`(`code`) USING BTREE,
  UNIQUE INDEX `role_code`(`code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_role
-- ----------------------------
-- INSERT INTO `saas_role` VALUES ('464198433314666729', '2023-06-08 08:37:07', '2023-06-27 06:43:15', 1, 1, NULL, '管理员', 'role.admin', '630eb68f-e0fa-5ecc-887a-7c7a62614681', 'dashboard', '管理员', '464198433314601193', NULL);

-- ----------------------------
-- Table structure for saas_tenant
-- ----------------------------
DROP TABLE IF EXISTS `saas_tenant`;
CREATE TABLE `saas_tenant`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'UUID',
  `key` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'key',
  `secret` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'secret | 授权secret',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'Tenant\'s name | 租户名称',
  `is_super` tinyint(1) NULL DEFAULT 0 COMMENT 'Is super tenant | 是否是超级租户',
  `service_start_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Tenant\'s service start | 服务开始时间例如2023-01-01 00:00:00',
  `service_end_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Tenant\'s service end| 服务到期时间例如2023-10-10 00:00:00',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `tenant_name_key`(`name`, `key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_tenant
-- ----------------------------
INSERT INTO `saas_tenant` VALUES ('464198433314601193', '2023-06-08 08:37:07', '2024-01-16 09:35:52', '01889a27-0021-7164-9c3b-d44c2490501f', 'cTTfaZUZQURSdM464198433314470121', 'SRXDJzBfWTPmrWDZmMSqhEvEXXJcKdJcrWzYvhJkqmbrsznSHvZFymjkvNAchzVhXqwYwCBuhrNrBBqdtHaqtMQHAYsvnqcWQhuwDdRFQEFvEQzenjJxMrKtnXjdexjd464198433314535657', 1, NULL, '管理单位', 1, '2023-06-07 18:00:00', '2023-06-22 20:00:00');

-- ----------------------------
-- Table structure for saas_tenant_user_info
-- ----------------------------
DROP TABLE IF EXISTS `saas_tenant_user_info`;
CREATE TABLE `saas_tenant_user_info`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `sort` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Sort number | 排序编号',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `extra` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL COMMENT 'Extra information | 额外信息(json对象格式存储，用于存储的额外展示信息)',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'Tenant ID | 租户 ID',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'User ID | 用户 ID',
  `user_tenant_infos` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_tenant_user_info
-- ----------------------------
-- INSERT INTO `saas_tenant_user_info` VALUES ('496384388674654209', '2024-01-16 09:35:52', '2024-01-16 09:35:52', 1, NULL, '{}', '464198433314601193', '467827342316697833', NULL);

-- ----------------------------
-- Table structure for saas_token
-- ----------------------------
DROP TABLE IF EXISTS `saas_token`;
CREATE TABLE `saas_token`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT ' User\'s UID | 用户的UID',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Token string | Token 字符串',
  `source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Log in source such as GitHub | Token 来源 （saas, 第三方如github等）',
  `expired_at` timestamp(0) NOT NULL COMMENT ' Expire time | 过期时间',
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'Tenant ID | 租户ID',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `token_uid`(`uid`) USING BTREE,
  INDEX `token_expired_at`(`expired_at`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_token
-- ----------------------------
-- INSERT INTO `saas_token` VALUES ('464198456534137065', '2023-06-08 08:37:21', '2023-06-08 08:37:21', 1, '464198433431910633', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODY0NzI2NDEsImlhdCI6MTY4NjIxMzQ0MSwidGVuYW50SWQiOiI0NjQxOTg0MzMzMTQ2MDExOTMiLCJ1c2VySWQiOiI0NjQxOTg0MzM0MzE5MTA2MzMifQ.95U2ZL1QH7CKkDjfDElKPhUGYFpM6tZtDvA4abhel_o', 'saas_user', '2023-06-11 08:37:21', '464198433314601193');

-- ----------------------------
-- Table structure for saas_user
-- ----------------------------
DROP TABLE IF EXISTS `saas_user`;
CREATE TABLE `saas_user`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Snowflake ID | 全局唯一ID',
  `created_at` timestamp(0) NOT NULL COMMENT 'Created Time | 创建时间',
  `updated_at` timestamp(0) NOT NULL COMMENT 'Updated Time | 更新时间',
  `status` tinyint(1) NULL DEFAULT 1 COMMENT 'status true normal false ban | 状态  正常/禁用',
  `deleted_at` timestamp(0) NULL DEFAULT NULL COMMENT 'Deleted Time | 删除时间（软删除标识）',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'User\'s login name | 登录名',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT 'Password | 密码Hash',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'Nickname | 昵称',
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'Mobile number | 手机号',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'Email | 邮箱号',
  `gender` enum('未设置','男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '未设置' COMMENT 'gender | 性别',
  `post` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'post | 职务',
  `is_superuser` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Is Superuser | 是否超级管理员',
  `default_tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT 'Default tenant id | 默认租户ID，用于快速登录',
  `avatar_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '' COMMENT 'Avatar FIle ID | 头像文件ID',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `user_username_email`(`username`, `email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saas_user
-- ----------------------------
INSERT INTO `saas_user` VALUES ('464198433431910633', '2023-06-08 08:37:07', '2024-01-25 07:39:58', 1, NULL, 'admin', '$2a$10$hqYv65JJPBWE4qXoxJ2AVu30hfXeXGvVbSgpUQVQ021fKReZDicnO', '超级管理员', '15900000001', 'admin@admin.com', '未设置', '', 1, '464198433314601193', '');

-- ----------------------------
-- Table structure for tenant_users
-- ----------------------------
DROP TABLE IF EXISTS `tenant_users`;
CREATE TABLE `tenant_users`  (
  `tenant_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`tenant_id`, `user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tenant_users
-- ----------------------------
-- INSERT INTO `tenant_users` VALUES ('', '464303678199724265');

-- ----------------------------
-- Table structure for user_groups
-- ----------------------------
DROP TABLE IF EXISTS `user_groups`;
CREATE TABLE `user_groups`  (
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `group_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`, `group_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_groups
-- ----------------------------
-- INSERT INTO `user_groups` VALUES ('464311189476767977', '466801699646896361');

-- ----------------------------
-- Table structure for user_organizations
-- ----------------------------
DROP TABLE IF EXISTS `user_organizations`;
CREATE TABLE `user_organizations`  (
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `organization_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`, `organization_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_organizations
-- ----------------------------
-- INSERT INTO `user_organizations` VALUES ('464198433431910633', '465055295362595049');

-- ----------------------------
-- Table structure for user_positions
-- ----------------------------
DROP TABLE IF EXISTS `user_positions`;
CREATE TABLE `user_positions`  (
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `position_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`user_id`, `position_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_positions
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
