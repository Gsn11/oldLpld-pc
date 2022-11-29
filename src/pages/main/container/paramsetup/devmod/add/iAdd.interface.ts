export interface IAddList {
	MainType: string;  // 设备主分类(必填)
	Type: any; // 设备分类
	Brand: string; // 厂商品牌
	Id: string; // 设备型号(必填)
	Name: string; // 设备名称
	Size: string; // 设备尺寸
	Weight: string; // 设备重量(KG)
	Power: number; // 设备功率(瓦)
	Certificate: string; // 产品认证
	Desc: string; // 设备说明
	Prob: string; // 常见问题
	Pics?: any[];
	Thresholds: any; // 阈值
	Mobile: any; // 接收电话
	Code?: any; // 接收电话
}
