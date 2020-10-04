import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnackService} from './snack.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Price} from '../models/price';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private url = 'api/token';

  constructor(private http: HttpClient, private snackService: SnackService) { }

  getHistoryData(): Observable<Price[]> {
    return this.http.get<Price[]>(`${this.url}/history/FARM`).pipe(
      catchError(this.snackService.handleError<Price[]>(`history Price`))
    );
  }

  getLastData(from: string): Observable<Price[]> {
    return this.http.get<Price[]>(`${this.url}/last/FARM/${from}`).pipe(
      catchError(this.snackService.handleError<Price[]>(`last Price ${from}`))
    );
  }
}
