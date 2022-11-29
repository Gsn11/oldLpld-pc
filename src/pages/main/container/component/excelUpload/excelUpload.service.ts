import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ServiceError } from '../../../../../config/config.service';
import { UploadHeaders } from '../../../../common/utils/js/headers/uploadHeader';
import { RsaHelper } from '../../../../common/utils/js/headers/reshelper';
import { map } from 'rxjs/operators';

@Injectable()
export class ExcelUploadService {
  er: any;
  constructor(private http: HttpClient) {
    this.er = new ServiceError();
  }

  upload(url: string, data: object) {
    const uploadHeader = new UploadHeaders(data);
    const header = uploadHeader.createHeaders();
    return this.http.post (environment.baseUrl + url, data, {
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
