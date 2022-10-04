/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : yl

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 03/10/2022 20:09:51
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for food
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '美食名称',
  `image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片',
  `link` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '链接',
  `number` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '推荐人数',
  `area` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '区域',
  `address` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES (1, '北京烤鸭', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1A/Cii-s1srWamIYlSgAA0virJ7GgQAAI6MQPd5n4ADS-i050_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/621/', '337人推荐', 'https://www.tuniu.com/restaurant/37255/', '全聚德（前门店）');
INSERT INTO `food` VALUES (2, '炸酱面', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1A/Cii-tFsrWcGIVIxwAAtUN9s91m8AAI6MgGsNyUAC1RP133_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/82/', '359人推荐', 'https://www.tuniu.com/restaurant/3793969/', '老北京炸酱面大王(崇文门总店)');
INSERT INTO `food` VALUES (3, '炒肝儿', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1B/Cii-s1srWl2IaL6KAATR7Z1PtusAAI6NAJPtBcABNIF553_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/74/', '386人推荐', 'https://www.tuniu.com/restaurant/1800341/', '姚记炒肝店（鼓楼店）');
INSERT INTO `food` VALUES (4, '爆肚', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1A/Cii-tFsrWZaIOd9aAAdaXgNNRa4AAI6MQI2Yo8AB1p2972_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/4230/', '282人推荐', 'https://www.tuniu.com/restaurant/2044306/', '爆肚金生隆');
INSERT INTO `food` VALUES (5, '豆汁儿', 'https://m.tuniucdn.com/fb2/t1/G5/M00/08/0D/Cii-s1sCJ_GIa9igAAWFqcNif28AAHHhAGo1ZwABYXB542_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/79/', '122人推荐', 'https://www.tuniu.com/restaurant/1800343/', '白魁老号饭庄（交道口店）');
INSERT INTO `food` VALUES (6, '卤煮火烧', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1A/Cii-slsrWdSIYLiMAAkXtKhyKfkAAI6MgI1rf0ACRfM194_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/81/', '199人推荐', 'https://www.tuniu.com/restaurant/1800340/', '鸿宾楼');
INSERT INTO `food` VALUES (7, '驴打滚', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/19/Cii-slsrWUaIGt0oAAds24tWh0wAAI6LwOyUJkAB2zz732_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/4231/', '148人推荐', 'https://www.tuniu.com/restaurant/1810280/', '护国寺小吃(青塔店)');
INSERT INTO `food` VALUES (8, '焦圈儿', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/18/Cii-tFsrWOeIOiHLAAWPnSA_ke4AAI6LQIA-hUABY-1306_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/4593/', '361人推荐', 'https://www.tuniu.com/restaurant/1810280/', '护国寺小吃(青塔店)');
INSERT INTO `food` VALUES (9, '豌豆黄', 'https://m.tuniucdn.com/fb2/t1/G5/M00/08/11/Cii-s1sCKWaIL5-cAAWdc4nr_LYAAHHiwDN22YABZ2L476_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/9579/', '290人推荐', 'https://www.tuniu.com/restaurant/3534850/', '印巷小馆（南锣鼓巷店）');
INSERT INTO `food` VALUES (10, '艾窝窝', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1A/Cii-slsrWfiIAIfYAAh55-eIBo4AAI6MgPzdnAACHn_936_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/80/', '258人推荐', 'https://www.tuniu.com/restaurant/3534295/', '锦芳小吃（磁器口店）');
INSERT INTO `food` VALUES (11, '面茶', 'https://m.tuniucdn.com/fb2/t1/G5/M00/08/11/Cii-s1sCKU6IEJaYAAQVr4_eJKQAAHHigOHvmMABBXH593_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/9578/', '290人推荐', 'https://www.tuniu.com/restaurant/3534295/', '锦芳小吃（磁器口店）');
INSERT INTO `food` VALUES (12, '杏仁茶', 'https://m.tuniucdn.com/fb2/t1/G2/M00/A3/AC/Cii-TlhsmeKIK-8IAAM-tBSwR8IAAGU8wCogd4AAz7M114_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/8910/', '293人推荐', 'https://www.tuniu.com/restaurant/3095101/', '海碗居(王府井百货大楼店)');
INSERT INTO `food` VALUES (13, '北京烤鸭', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1A/Cii-s1srWamIYlSgAA0virJ7GgQAAI6MQPd5n4ADS-i050_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/621/', '337人推荐', 'https://www.tuniu.com/restaurant/37255/', '全聚德（前门店）');
INSERT INTO `food` VALUES (14, '北京涮羊肉', 'https://m.tuniucdn.com/filebroker/cdn/snc/cc/f4/ccf497528199fb732d60a6e2e80ddfd4_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/4229/', '324人推荐', 'https://www.tuniu.com/restaurant/1810277/', '东来顺饭庄');
INSERT INTO `food` VALUES (15, '芸豆卷', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1B/Cii-slsrWiOIZmzcAATotIYr4YsAAI6MwMWZOkABOjM416_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/77/', '392人推荐', 'https://www.tuniu.com/restaurant/1800343/', '白魁老号饭庄（交道口店）');
INSERT INTO `food` VALUES (16, '糖耳朵', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1B/Cii-slsrWg6IN9j4AAiojbuW6v0AAI6MwIVUUMACKil074_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/78/', '147人推荐', 'https://www.tuniu.com/restaurant/1800343/', '白魁老号饭庄（交道口店）');
INSERT INTO `food` VALUES (17, '排叉', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1B/Cii-tFsrWjKIKzlhAAVeNmBvr54AAI6MwPeHFYABV5O866_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/76/', '346人推荐', 'https://www.tuniu.com/restaurant/1800342/', '东来顺（王府井店）');
INSERT INTO `food` VALUES (18, '宫廷奶酪', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/1B/Cii-tFsrWkyIUbWTAAP00c0oGDcAAI6NAFdZ0wAA_Tp359_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/75/', '295人推荐', 'https://www.tuniu.com/restaurant/1800340/', '鸿宾楼');
INSERT INTO `food` VALUES (19, '炸灌肠', 'https://m.tuniucdn.com/fb2/t1/G5/M00/4A/19/Cii-tFsrWS2IVy9PAAaexCzoeRYAAI6LwFEi2AABp7c819_w320_h180_c1_t0.jpg', 'https://www.tuniu.com/cuisine/4591/', '278人推荐', 'https://www.tuniu.com/restaurant/1800340/', '鸿宾楼');

SET FOREIGN_KEY_CHECKS = 1;
