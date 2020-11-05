import {AfterViewInit, Component} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {UniswapDto} from '../../models/uniswapDto';
import {WsConsumer} from '../../services/ws-consumer';
import {Utils} from '../../utils';
import {TxHistoryService} from '../../services/tx-history.service';
import {NGXLogger} from 'ngx-logger';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-uni-tx',
  templateUrl: './uni-tx.component.html',
  styleUrls: ['./uni-tx.component.css']
})
export class UniTxComponent implements AfterViewInit, WsConsumer {
  private maxMessages = 500;
  dtos: UniswapDto[] = [];
  dtosWhales: UniswapDto[] = [];
  subscribed = false;
  txIds = new Set<string>();

  constructor(private ws: WebsocketService,
              private txHistory: TxHistoryService,
              private log: NGXLogger) {
  }

  private static saveLastValue(tx: UniswapDto): void {
    if (!tx.confirmed || tx.lastPrice === 0) {
      return;
    }
    if (tx.lastPrice != null && tx.lastPrice !== 0) {
      AppComponent.lastPrice = tx.lastPrice;
    }
    if (tx.lastGas != null || tx.lastGas !== 0) {
      AppComponent.lastGas = tx.lastGas;
    }
    if (tx.blockDateAdopted != null) {
      AppComponent.lastBlockDateAdopted = tx.blockDateAdopted;
    }
  }

  setSubscribed(s: boolean): void {
    this.subscribed = s;
  }

  isSubscribed(): boolean {
    return this.subscribed;
  }

  ngAfterViewInit(): void {
    this.txHistory.getUniswapTxHistoryData().subscribe(data => {
      Utils.loadingOff();
      this.log.info('tx data fetched', data);
      data.forEach(tx => {
        UniswapDto.round(tx);
        UniTxComponent.saveLastValue(tx);
        if (tx.amount < 1000) {
          this.addInArray(this.dtos, tx);
        } else {
          this.addInArray(this.dtosWhales, tx);
        }
      });
    }, err => {
      Utils.loadingOff();
    });
    this.initWs();
  }

  public initWs(): void {
    if (this.ws.registerConsumer(this) && !this.subscribed) {
      this.subscribeToTopic();
    }
  }

  public subscribeToTopic(): void {
    this.subscribed = true;
    this.ws.onMessage('/topic/transactions', (m => UniswapDto.fromJson(m.body)))
      .subscribe(tx => {
        if (!this.isUniqTx(tx)) {
          this.log.error('Not unique', tx);
          return;
        }
        if (tx.amount < 1000) {
          this.addInArray(this.dtos, tx);
        } else {
          this.addInArray(this.dtosWhales, tx);
        }
        UniTxComponent.saveLastValue(tx);
      });
  }

  private isUniqTx(tx: UniswapDto): boolean {
    if (this.txIds.has(tx.id)) {
      return false;
    }
    this.txIds.add(tx.id);
    if (this.txIds.size > 100_000) {
      this.txIds = new Set<string>();
    }
    return true;
  }

  private addInArray(arr: UniswapDto[], tx: UniswapDto): void {
    arr.unshift(tx);
    if (arr.length > this.maxMessages) {
      arr.pop();
    }
  }
}
