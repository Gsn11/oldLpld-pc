import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SetHeaders } from '../common/utils/js/headers/header';
import { catchError } from 'rxjs/operators';
import { ServiceError } from '../../config/config.service';
import { RsaHelper } from '../common/utils/js/headers/reshelper';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class RequestService {
	er: any;
	constructor(private http: HttpClient) {
		this.er = new ServiceError();
	}
	request(url: string, data: object) {
		const deafultHeaders = new SetHeaders(data);
		const header = deafultHeaders.createHeaders();
		const encryptData = new RsaHelper().encryptRSA(JSON.stringify(data));
		return this.http.post(environment.baseUrl + url, encryptData, {
			headers: header,
			observe: 'response',
			responseType: 'text'
		})
			.pipe(
				map((d) => {
					return JSON.parse(new RsaHelper().decryptRSA(d.body));
				}),
				catchError((err) => this.er.handleError(err))
			);
	}
	requestReport(url: string, data: any) {
		return this.http.get(environment.reportBaseUrl + url, {
			observe: 'body',
			params: data,
			responseType: 'json'
		})
			.pipe(
				map((d) => {
					console.log(d)
					return d;
				}),
				catchError((err) => this.er.handleError(err))
			);
	}
	requestReportPost(url: string, data: any) {
		return this.http.post(environment.reportBaseUrl + url,data, {
			observe: 'response',
			responseType: 'text'
		})
			.pipe(
				map((d) => {
					console.log(d)
					return d;
				}),
				catchError((err) => this.er.handleError(err))
			);
	}
}
