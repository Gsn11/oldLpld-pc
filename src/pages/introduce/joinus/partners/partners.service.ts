import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SetHeaders } from '../../../common/utils/js/headers/header';

@Injectable()

export class PartnersService {
  constructor(private http: HttpClient) {}
  setRegister(data: object) {
    const deafultHeaders = new SetHeaders(data);
    const header = deafultHeaders.createHeaders();
    return this.http.post (environment.baseUrl + 'customer/register', data, { headers: header });
  }
}
