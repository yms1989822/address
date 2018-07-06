

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `UserAddress`
-- ----------------------------
DROP TABLE IF EXISTS `UserAddress`;
CREATE TABLE `UserAddress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `cityid` int(11) NOT NULL,
  `company` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `county` varchar(255) DEFAULT NULL,
  `countyid` int(11) NOT NULL,
  `isdefault` int(11) NOT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `provinceid` int(11) NOT NULL,
  `shipperCode` varchar(255) DEFAULT NULL,
  `sysusercode` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `UserAddress`
-- ----------------------------
BEGIN;
INSERT INTO `UserAddress` VALUES ('1', '东单北大街协和', '北京市', '0', '家', '张某某', '东城区', '0', '1', '18519337653', '北京市', '0', null, null, '18519337653', '2'), ('3', '东单北大街协和明日大厦', '北京', '110100', '协和医院', '张三', '东城区', '110101', '1', '15215485291', '北京', '110000', '000000', 'admin', '15215485291', '0'), ('4', '东华', '北京市', '0', '家', '岳茂松', '东城区', '0', '0', '18660824890', '北京市', '0', null, null, '18660824890', '1'), ('5', '测试', '北京市', '0', '家', '王文佳', '东城区', '0', '1', '18660822109', '北京市', '0', null, null, '18660822109', '3'), ('6', '海淀区', '北京市', '0', '家', '王奎忠', '东城区', '0', '1', '18660838883', '北京市', '0', null, null, '18660838883', '5'), ('7', '地址', '北京市', '0', '家', '岳茂松', '东城区', '0', '1', '18660824890', '北京市', '0', null, null, '18660824890', '1'), ('8', '可贷款', '北京市', '0', '家', '礼广林', '东城区', '0', '1', '17609845691', '北京市', '0', null, null, '17609845691', '11'), ('9', '地址', '北京市', '0', '家', '岳茂松', '东城区', '0', '1', '18660824890', '北京市', '0', null, null, '18660824890', '20'), ('10', '测试详细地址', '太原市', '0', '家', '测试地址', '小店区', '0', '1', '18660811111', '山西省', '0', null, null, '18660811111', '123321');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
