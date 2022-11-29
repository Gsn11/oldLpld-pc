export interface IEditList {
    ArriveExpire: number; // 抵达时限（小时）
    Charger: number;  // 物业负责人
    ScheItems: any;
    MSDesc: string;  // 计划描述
    MSName: string; // 计划名称
    OrderExpire: number;  // 接单时限（小时）
    Pics: any; // 图片
    ServiceType: number; // 服务提供方
    WorkExpire: number;  // 处理反馈时限（小时）
    Prices?: any; // 维保计划细节，多个（List<Map>）,Map存的是单个价格信息（Item报价条目，对应customer_offer_item中内容，Price价格）
    Workers?: string; // 工作人员
    PriceVisit?: number; // 上门费用
    OrderTime: string; // 订单开始时间
    NeedQrcode: number; // 是否开启扫码
}
