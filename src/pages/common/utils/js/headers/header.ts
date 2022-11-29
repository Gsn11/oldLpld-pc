/**
 * 请求接口头部信息
 */
import { Constants } from '../constants';
import { Signature } from './sign';

/**
 * 创建头部信息类
 * @param options 传入的body/data
 */
export class SetHeaders extends Signature {
    options: any;
    localIp = null;
    token: string;
    imgTokenListName: string;
    Encrypted: string = null;
    constructor(options?: any, imgTokenListName?: string) {
        super();
        this.options = options;
        this.imgTokenListName = imgTokenListName;
        if (localStorage.getItem('bemUserIP')) {
            this.localIp = localStorage.getItem('bemUserIP');
        }
        let token = '';
        if (JSON.parse(localStorage.getItem('bemUserInfo')) !== null) {
            token = JSON.parse(localStorage.getItem('bemUserInfo')).Token;
        } else {
            token = Constants.TokenKey;
        }
        this.options = {
            'Content-Type': 'application/json; charset=UTF-8',
            SignatureKey: '86AB686D19F3',
            body: this.options,
            Token: token,
            LocalIp: this.localIp,
            ClientChannel: Constants.ClientChannel,
            ClientApp: Constants.ClientApp,
            ClientVer: Constants.ClientVer
        };
        if (this.imgTokenListName) {
            this.options = {
                ...this.options,
                ImgTokenListName: this.imgTokenListName
            };
        }
    }

    createHeaders() {
        // 规则制定不能用ng 的 @angular/common/http 下的 header模块生成头部信息
        // 必须以json字符串表示头部信息
        const httpOptions = {
            'Content-Type': 'application/json; charset=UTF-8',
            Token: this.options.Token,
            LocalIp: this.localIp !== null ? this.localIp : '',
            ClientChannel: Constants.ClientChannel,
            ClientApp: Constants.ClientApp,
            ClientVer: Constants.ClientVer,
            Signature: super.sign(this.options.Token, this.options, this.options.body)
        };
        if (this.imgTokenListName) {
            Reflect.set(httpOptions, 'ImgTokenListName', this.imgTokenListName);
        }
        return httpOptions;
    }
}
