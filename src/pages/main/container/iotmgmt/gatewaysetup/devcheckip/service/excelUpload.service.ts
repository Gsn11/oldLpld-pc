import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ServiceError } from '../../../../../../../config/config.service';
import { UploadHeaders } from '../../../../../../common/utils/js/headers/uploadHeader';

@Injectable()
export class ExcelUploadService {
  er: any;
  constructor(private http: HttpClient) {
    this.er = new ServiceError();
  }

  upload(data: object) {
    const uploadHeader = new UploadHeaders(data);
    const header = uploadHeader.createHeaders();
    // console.log(header);
    return this.http.post (environment.baseUrl + 'ent/iot/batchmetric/30001', data, { headers: header })
    .pipe(
      catchError((err) => this.er.handleError(err))
    );
  }
}
