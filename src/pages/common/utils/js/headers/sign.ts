/**
 * 请求接口头部信息
 */
import { Constants } from '../constants';
import { enc, SHA256 } from 'crypto-js';
import { StrEmpty } from '../empty';

export class Signature {
    token: string;
    headers: any;
    body: any;
    constructor() {}
    // 按规则生成签名
    sign(token: string, headers: any, body: any): any {
        let hd = '';
        if (headers) {
            hd = `${headers.ClientChannel}${headers.ClientApp}${headers.ClientVer}`;
        }
        const empty = new StrEmpty();
        const txt = empty.isEmpty(body);
        const tk = JSON.parse(empty.isEmpty(token));
        let data: any;
        if (txt !== null && tk !== null) {
            data = `${tk}${Constants.SignatureKey}${hd}${txt}`;
        } else {
            if (txt === null) {
                data = `${tk}${Constants.SignatureKey}${hd}`;
                if (tk === null) {
                    data = `${Constants.SignatureKey}${hd}`;
                }
            } else {
                data = `${Constants.SignatureKey}${hd}${txt}`;
            }
        }
        const res = SHA256(data).toString(enc.Hex);
        return res;
    }
}
