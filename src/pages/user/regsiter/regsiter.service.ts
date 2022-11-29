import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SetHeaders } from '../../common/utils/js/headers/header';
import { RsaHelper } from '../../common/utils/js/headers/reshelper';
import { map } from 'rxjs/operators';

@Injectable()

export class RegsiterService {
  constructor(private http: HttpClient) {}

  setRegister(data: object) {
    const deafultHeaders = new SetHeaders(data);
    const header = deafultHeaders.createHeaders();
    const encryptData = new RsaHelper().encryptRSA(JSON.stringify(data));
    return this.http.post (environment.baseUrl + 'customer/register', encryptData, {
      headers: header,
      observe: 'body',
      responseType: 'text'
    })
    .pipe(
      map(d => JSON.parse(new RsaHelper().decryptRSA(d)))
    );
  }
}
