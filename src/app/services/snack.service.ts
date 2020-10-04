import { Injectable } from '@angular/core';

import {Observable, of, Subject} from 'rxjs';
import {Utils} from '../utils';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NGXLogger} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  private messages = new Subject<string>();
  constructor(public snackBar: MatSnackBar, private log: NGXLogger) {
  }

  public openSnack(message): void {
    // this.snackBar.openFromComponent(SnackErrorComponent, {
    //   duration: 2000,
    //   data: message
    // });
    Utils.setAlertMessage(message);
  }

  public dismiss(): void {
    this.snackBar.dismiss();
  }

  public getErrorText(e): string {
    let s = '';
    if (e) {
      s += e.status;
    }
    if (e.error) {
      s += ': ' + e.error.message;
    }
    return s;
  }

  public handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      this.dismiss();
      this.openSnack(this.getErrorText(error));
      this.log.error('Catch error:', error); // log to console instead
      if (error && error.error && error.error.message === 'Full authentication is required to access this resource') {
        // this.autoLogoutService.logout();
      }
      return of(result as T);
    };
  }
}
