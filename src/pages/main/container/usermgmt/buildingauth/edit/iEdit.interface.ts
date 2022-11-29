export interface IEditList {
    BSeq: number; // 唯一标识
    Addr: string; // 建筑物地址
    BDesc: string;  // 建筑物简介
    BType: number;
    BuildCompany: string; // 施工方
    BuildEnd: string; // 完工日期
    BuildingGroup: string; // ---
    BuildingTime: string; // 开工日期
    City: string; // 城市code
    ConstructCompany: string; // 建设方
    DesignCompany: string; // 设计方
    District: string; // 区域
    FloorArea: number; // 面积（平方米）
    GdLat: number; // 高德地图纬度
    GdLng: number; // 高德地图经度
    InvestCapital: number; // 总投资（万元）
    Name: string; // 建筑物名称
    Pics: object; // 厂商其他图片，多个（List<Map>）,Map存的是单个图片信息（ImgUrl路径，ImgDesc说明）
    OldPics: object;
    Province: string; // 省份
    Subjection?: number; // 归属园群
    SuperVisor: string; // 监理方
    Tel: string; // 联系电话
    UsageCode: string; // 建筑类型
    WarrantyEnd: string; // 保修截止日期
    Scale: number;  // 规模（座 / 台）
}
