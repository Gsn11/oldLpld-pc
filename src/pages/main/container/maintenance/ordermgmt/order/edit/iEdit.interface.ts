export interface IEditList {
    Prices?: any; // 维保计划细节，多个（List<Map>）,Map存的是单个价格信息（Item报价条目，对应customer_offer_item中内容，Price价格）
    MOSeq: number;
    OrderSeq: number;
}
