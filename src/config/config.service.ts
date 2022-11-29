import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class ServiceError {
  constructor() { }
  private handleError(error: HttpErrorResponse) {
    // console.log(error);
    if (error.error instanceof ErrorEvent && error.error) {
      // console.error('error is:' + error.error.message);
      return throwError(error.error.message);
    } else {
      // console.error(`返回错误代码 ${error.error.ResultCode}` +
        // `body was: ${error.error.Result}`);

    }
    return throwError(error.error);
  }
}
