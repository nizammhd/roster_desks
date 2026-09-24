export type ShiftCode='D'|'E'|'N'|'L'; export type Grade='SENIOR'|'JUNIOR';
export type Staff={id:string;name:string;grade:Grade;icuCertExpiry:string|null;leaveDates:string[]};
export type RosterCell={id:string;staffId:string;date:string;shift:ShiftCode|null;version:number};
export type Roster={wardCode:string;isoWeek:string;version:number;published:boolean;cells:RosterCell[]};
export type Violation={rule:string;severity:'ERROR'|'WARNING';staffId?:string;date?:string;message:string};
export type Ward={code:string;name:string;requirements:Record<'D'|'E'|'N',{total:number;seniors:number}>};
export type Swap={id:string;fromStaffId:string;toStaffId:string;date:string;shift:ShiftCode;status:'PENDING'|'APPROVED'|'REJECTED';reason?:string};
