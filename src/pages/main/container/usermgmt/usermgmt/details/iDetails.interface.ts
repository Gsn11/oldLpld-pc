export interface IDetailsList {
    Customer: number;
    LoginId: string;
    Email: string;
    IsPub: number;
    IsAdmin?: number;
    IsEngineer?: number;
    Jobs?: [];
    Name: string;
    ResponseTime: number;
    Roles?: string;
    ServiceZone?: string;
    Sex?: string;
    State: string;
    Tel: string;
    USeq?: number;
    Domain: string;
    Subjection: number; // 所属区域
    ParentSeq: number; // 上级领导流水号
    EmergencyContact?: any;
    EmergencyContactTelephone?: any;
}
