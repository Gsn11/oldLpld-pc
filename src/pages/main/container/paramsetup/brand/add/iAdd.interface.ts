export interface IAddList {
	BRName: string; // 品牌名称
	BRFacturer?: string; // 品牌所属厂商
	BRLocalName: string; // 品牌英文名称
	Proposer: string; // 申请人
	ProposerAddr: string; //  申请人地址
	RegisterZone: string;  // 注册地
	RegisterType: string; // 注册类型
	RegisterCode: string; // 注册号
	RegisterDate: string; // 申请日期
	ExpireDate: string; // 失效日期
	Pics: object[]; // 品牌其他图片，多个（List<Map>）,Map存的是单个图片信息（ImgUrl路径，ImgDesc说明）
	BRImg: string; // 品牌图标文件（multipart）
}
