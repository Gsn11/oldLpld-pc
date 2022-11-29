export interface IList {
	Seq?: number;
	AlertFormula: string;  // 报警公式

	BoxDevNo?: string;  // 归属箱/柜编号   这个服务端字段使用的是DeviceNo不是Seq
	NewBoxDevNo?: string;
	DMBDesc: string;  // 测量说明

	DeviceNo?: string;  // 设备编号   这个服务端字段使用的是DeviceNo不是Seq
	NewDeviceNo?: string;
	Formula: string; // 计算公式

	Gateway?: string; // 智联网关 deviceInfo.DeviceNo
	NewGateway?: string;

	Id?: string; // 测量变量
	NewId?: string;
	IsAlert: string; // 数据点/报警点

	SmartDevNo?: string; // JACE/DDC/PLC/Modbus路由
	NewSmartDevNo?: string;
	UploadFormula: string; // 上传公式
}

export interface IBacnet extends IList {
	BacnetDevId?: string; // BACNET协议中的device id
	BacnetObjectId?: string; // BACNET协议中的测量点object id
}

export interface IOPC extends IList {
	Item?: string; // 条目（item）
	Port?: number; // OPC服务器端口
	Ip?: string;
	ProtocolVer?: string; // OPC协议版本
	ClsId?: string; // ClsId / Endpoint Url
}

export interface IMODBUS extends IList {
	SlaveId?: number; // 从站id
	Register?: string; // 寄存器类型
	ValType?: string; // 值类型
	StartAddr?: number;  // 起始地址
	Quantity?: number; // 字数量（word quantity）
	IsBigEndian?: string;  // 大端模式 / 小端模式
}

export interface IOBIX extends IList {
	Item?: string; // 点路径url
}

export interface IBem extends IList {
	Item?: string; // 点路径ord
}
