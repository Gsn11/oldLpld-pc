export interface IEditList {
    ArriveExpire: number; // 抵达时限（小时）
    BeginTime: string;
    EndTime: string;
    Charger: number;  // 物业负责人
    Items: any;
    MSDesc: string;  // 计划描述
    MSName: string; // 计划名称
    OrderExpire: number;  // 接单时限（小时）
    Pics: any; // 图片
    OldPics: any;
    ServiceType: number; // 服务提供方
    TimeType: string;  // 任务周期
    WorkExpire: number;  // 处理反馈时限（小时）
    Prices?: any; // 维保计划细节，多个（List<Map>）,Map存的是单个价格信息（Item报价条目，对应customer_offer_item中内容，Price价格）
    Workers?: string; // 工作人员
    MSSeq: number;
    Time?: string;  // TimeType === 1,2,3时所选时间
    Day?: string; // TimeTYpe === 2,3是所选日期
    PriceVisit: number; // 上门费
    NeedQrcode: number; // 是否开启扫码
    NeedSms: number; // 是否发送短信
}
