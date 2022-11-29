export interface IUpdateInterface {
    OldBUCode: string;   // -旧Code用于删除匹配
    BUCode: string;   //  建筑用途代码 -新Code用于存储
    BUDesc: string;  //  建筑用途说明  -建筑说明也是建筑名称字段
    BUParent: string;  // 建筑物用途父级  -用于树形结构父级标识
}

