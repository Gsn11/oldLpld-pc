export interface IAddList {
    AlertLevel: number;  // 警报等级
    BSpaceSeq: number;  //  安装的空间位置
    Building: number;  //  安装在哪个建筑物
    BuyDate: string; // 购买时间
    DeviceName: string;  //  设备名称
    DeviceNo: string; // 设备编号
    Floor: string;  // 楼层
    InstallDate: string; //  安装时间
    ManuDate: string; // 出厂时间
    Model: number;  // 设备流水号
    Pics: any;
    Price: number;
    ServiceLife: number; // 保修截止日期
    SpacePos: string;  // 所在区域/房间的空间位置
    Stat: string;  // 状态
    SubSys: number;  //  所属子系统
    WarrantyExpire: string;  // 设备寿命
    Zone: string; // 所在楼层的区域/房间
    DeviceExtno: string; // 设备标识符
    LastMaintainDate: string; // 上次保养时间
    NextMaintainDate: string; // 下次保养时间
    MaintainPeriod: number | string; // 保养周期
    AssetsName?: any; // 固定资产编号
    AssetsNo?: any; // 固定资产名称
    FactoryNo?: any; // 出厂编号
}
