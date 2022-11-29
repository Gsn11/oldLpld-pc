export interface IAddList {
    ArriveExpire: number; // 抵达时限（小时）
    Charger: number;  // 物业负责人
    MSDesc: string;  // 计划描述
    MSName: string; // 计划名称
    OrderExpire: number;  // 接单时限（小时）
    Pics: any; // 图片
    ServiceType: number; // 服务提供方
    WorkExpire: number;  // 处理反馈时限（小时）
    Prices?: any; // 维保计划细节，多个（List<Map>）,Map存的是单个价格信息（Item报价条目，对应customer_offer_item中内容，Price价格）
    Workers?: string; // 工作人员
    Type: number;
    FeedbackType: number;
    Customer: number;
    AlertRecord: any;
    DevRecord: any;
    MSType: number;
    PriceVisit: number; // 上门费
}
