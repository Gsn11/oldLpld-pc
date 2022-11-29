export interface IAddList {
    FSeq: number; // 唯一标识
    FName: string;  // 厂商名称
    FLocalName: string; // 厂商本地名称
    Country: string; // 国家
    Addr: string; // 地址
    Creator?: number;
    Site: string; // 厂商网站
    CreditCode: string; // 社会信用代码
    GdLat: number; // 高德地图纬度
    GdLng: number; // 高德地图经度
    LegalPerson: string; // 法人
    Regcapital: number; // 注册资本
    Business: string; // 行业
    Hotline: string; // 热线
    Fax: string; // 传真
    Officetel: string; // 办公电话
    Service: string; // 服务标准
    Wechat: string; // 企业微信公众号
    Desc: string; // 企业简介
    Product: string; // 主营产品
    FImg?: string; // 厂商图标云端路径(param)，有值multipart无效
    Pics: object; // 厂商其他图片，多个（List<Map>）,Map存的是单个图片信息（ImgUrl路径，ImgDesc说明）
    Province: string; // 省份
    City: string; // 城市
    District: string; // 地区
    CreateDate: string; // 成立日期
}
