import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnackService} from './snack.service';
import {Observable} from 'rxjs';
import {Price} from '../models/price';
import {catchError} from 'rxjs/operators';
import {UniswapDto} from '../models/uniswapDto';
import {HarvestDto} from '../models/harvest-dto';

@Injectable({
  providedIn: 'root'
})
export class TxHistoryService {

  private url = 'api/transactions';

  constructor(private http: HttpClient, private snackService: SnackService) { }

  getUniswapTxHistoryData(): Observable<UniswapDto[]> {
    return this.http.get<UniswapDto[]>(`${this.url}/history/uni`).pipe(
      catchError(this.snackService.handleError<Price[]>(`Uni history`))
    );
  }

  getHarvestTxHistoryData(): Observable<HarvestDto[]> {
    return this.http.get<HarvestDto[]>(`${this.url}/history/harvest`).pipe(
      catchError(this.snackService.handleError<Price[]>(`Harvest history`))
    );
  }
}
