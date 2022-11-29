import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SetHeaders } from '../../common/utils/js/headers/header';
import { RsaHelper } from '../../common/utils/js/headers/reshelper';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
	constructor(private http: HttpClient) { }
	getCodeImg(data: object) {
		const deafultHeaders = new SetHeaders(data);
		const header = deafultHeaders.createHeaders();
		return this.http.post(environment.baseUrl + 'common/imgToken', data, {
			headers: header,
			observe: 'body',
			responseType: 'text'
		})
			.pipe(
				map(d => JSON.parse(new RsaHelper().decryptRSA(d)))
			);
	}

	checkLogin(data: object, codetoken: string) {
		const deafultHeaders = new SetHeaders(data, codetoken);
		const header = deafultHeaders.createHeaders();
		const encryptData = new RsaHelper().encryptRSA(JSON.stringify(data));
		return this.http.post(environment.baseUrl + 'customer/userlogin', encryptData, {
			headers: header,
			observe: 'body',
			responseType: 'text'
		})
			.pipe(
				map(d => JSON.parse(new RsaHelper().decryptRSA(d)))
			);
	}

	lpldCheckLogin(header: string, data: string) {
		console.log(encodeURIComponent(header));
		return this.http.get(environment.baseUrl + 'customer/userlogin', {
			headers: {
				ClientApp: '7',
				ClientChannel: '1',
				ClientVer: '1.0'
			},
			params: {
				__header__: encodeURIComponent(header),
				__body__: encodeURIComponent(data),
				__clientapp__: '7',
			},
			observe: 'body',
			responseType: 'text'
		})
			.pipe(
				map((d: any) => JSON.parse(new RsaHelper().decryptRSA(d)))
			);
	}
}
