export interface IAddList {
    Device: number;  // 智联网关Seq
    Ip: string;  //  对应协议主机IP或url
    ObjectId: string;  // 网关在Bacnet中的设备Id
    Port?: number; // 对应协议主机端口
    Protocol: string; // 协议类型
    Pwd: string;  // 对应协议密码
    SmartDev?: string; // modbus路由设备
    User: string;  // 对应协议用户名
    AuthType?: string; // 用户审核模式
    SecurityMode?: string; // 安全模式(SecurityMode)
    SecurityPolicy?: string; // 安全策略(SecurityPolicy)
    Qos?: number; // MQTT的 Qos参数
}
