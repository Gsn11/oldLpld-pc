export interface IAddList {
    recvType: number; // 发送类型  0 个人 1部门
    msg: string;  // 消息内容
    receivers?: string; // 接收人流水号，多个用逗号隔开，recvType为0时必填
    team?: number; // 部门流水号， recvType为1时必填
    title: string; // 标题
    memo: string; // 备注
    pics?: object[]; // 图片数组
    attach?: object[]; // 附件数组
}
