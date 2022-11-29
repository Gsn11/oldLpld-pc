import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SetHeaders } from '../pages/common/utils/js/headers/header';
import { ServiceError } from '../config/config.service';
import { RsaHelper } from 'src/pages/common/utils/js/headers/reshelper';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    er: any;
    constructor(private http: HttpClient) {
        this.er = new ServiceError();
    }
    getRegion() {
        const deafultHeaders = new SetHeaders();
        const header = deafultHeaders.createHeaders();
        return this.http.get(environment.baseUrl + 'common/regionJson', {
            headers: header,
            observe: 'response',
            responseType: 'text'
        })
        .pipe(
          map((d) => {
            if (d.headers.get('Encrypted') === '1') {
              return JSON.parse(new RsaHelper().decryptRSA(d.body));
            } else {
              return d.body;
            }
          }),
          catchError((err) => this.er.handleError(err))
        );
    }
}
