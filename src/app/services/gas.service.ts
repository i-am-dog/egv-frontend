import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gas} from '../models/gas';
import {SnackService} from './snack.service';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasService {
  private url = 'api/gas';

  constructor(private http: HttpClient, private snackService: SnackService) { }

  getHistoryData(): Observable<Gas[]> {
    return this.http.get<Gas[]>(`${this.url}/history`).pipe(
      catchError(this.snackService.handleError<Gas[]>(`history Gas`))
    );
  }

  getLastData(from: string): Observable<Gas[]> {
    return this.http.get<Gas[]>(`${this.url}/last/${from}`).pipe(
      catchError(this.snackService.handleError<Gas[]>(`last Gas ${from}`))
    );
  }

}
