import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { UploadHeaders } from '../../../../common/utils/js/headers/uploadHeader';
import { catchError } from 'rxjs/operators';
import { ServiceError } from '../../../../../config/config.service';
import { RsaHelper } from '../../../../common/utils/js/headers/reshelper';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Injectable()
export class UploadService {
  er: any;
  constructor(private http: HttpClient) {
    this.er = new ServiceError();
  }

  uploadImg(data: object): Observable<any> {
    const uploadHeader = new UploadHeaders(data);
    const header = uploadHeader.createHeaders();
    return this.http.post (environment.baseUrl + 'upload/img', data, {
      headers: header,
      observe: 'body',
      responseType: 'text'
    })
    .pipe(
      map(d => JSON.parse(new RsaHelper().decryptRSA(d))),
      catchError((err) => this.er.handleError(err))
    );
  }
}
