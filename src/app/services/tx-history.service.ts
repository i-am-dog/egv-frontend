import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnackService} from './snack.service';
import {Observable} from 'rxjs';
import {Price} from '../models/price';
import {catchError} from 'rxjs/operators';
import {Transaction} from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TxHistoryService {

  private url = 'api/transactions';

  constructor(private http: HttpClient, private snackService: SnackService) { }

  getHistoryData(): Observable<Transaction[]> {
    return this.http.get<Price[]>(`${this.url}/history`).pipe(
      catchError(this.snackService.handleError<Price[]>(`history Tx`))
    );
  }
}
