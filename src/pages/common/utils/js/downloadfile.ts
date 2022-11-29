import { environment } from '../../../../environments/environment';
import { SetHeaders } from './headers/header';
import { RsaHelper } from './headers/reshelper';

export class DownloadFile {
	body: any;
	url: string;
	constructor(_BODY: any, _ENTURL: string) {
		this.body = _BODY;
		this.url = _ENTURL;
	}
	downloadfile(): void {
		let url: string;
		const header = JSON.stringify(new SetHeaders(this.body).createHeaders());
		url = `${environment.baseUrl}${this.url}`;
		const encryptHeader = new RsaHelper().encryptRSA(header);
		const encryptData = new RsaHelper().encryptRSA(JSON.stringify(this.body));

		url = url + `?__header__=${encodeURIComponent(encryptHeader)}&__body__=${encodeURIComponent(encryptData)}&__clientapp__=7`;
   console.log(url,1111)
		window.open(url);
	}
}
