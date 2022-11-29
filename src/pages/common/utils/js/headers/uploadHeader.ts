/**
 * 请求接口头部信息
 */
import { Constants } from '../constants';
import { Signature } from './sign';

/**
 * 创建头部信息类
 * @param options 传入的body/data
 */
export class UploadHeaders extends Signature {
    options: any;
    token: string;
    constructor(options: any) {
        super();
        this.options = options;
        let token = '';
        if (JSON.parse(localStorage.getItem('bemUserInfo')) !== null) {
            token = JSON.parse(localStorage.getItem('bemUserInfo')).Token;
        } else {
            token = Constants.TokenKey;
        }
        this.options = {
            body: this.options,
            Token: token,
        };
    }

    createHeaders() {
        const headers = {
            ClientChannel: Constants.ClientChannel,
            ClientApp: Constants.ClientApp,
            ClientVer: Constants.ClientVer
        };
        const sign = super.sign(this.options.Token, headers, this.options.body);
        const h = {
            ...headers,
            Signature: sign,
            Token: this.options.Token
        };
        return h;
        // console.log(httpOptions);
        // return httpOptions;
    }
}
