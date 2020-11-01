import {AfterViewInit, Component} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {Transaction} from '../../models/transaction';
import {WsConsumer} from '../../services/ws-consumer';
import {Utils} from '../../utils';
import {TxHistoryService} from '../../services/tx-history.service';
import {NGXLogger} from 'ngx-logger';

@Component({
  selector: 'app-uni-tx',
  templateUrl: './uni-tx.component.html',
  styleUrls: ['./uni-tx.component.css']
})
export class UniTxComponent implements AfterViewInit, WsConsumer {
  static lastTx = new Transaction();
  private maxMessages = 500;
  transactions: Transaction[] = [];
  transactionsBig: Transaction[] = [];
  subscribed = false;

  constructor(private ws: WebsocketService,
              private txHistory: TxHistoryService,
              private log: NGXLogger) {
  }

  setSubscribed(s: boolean): void {
    this.subscribed = s;
  }

  isSubscribed(): boolean {
    return this.subscribed;
  }

  ngAfterViewInit(): void {
    this.txHistory.getHistoryData().subscribe(data => {
      Utils.loadingOff();
      this.log.info('tx data fetched', data);
      data.forEach(tx => {
        Transaction.round(tx);
        UniTxComponent.lastTx = tx;
        if (tx.amount < 1000) {
          this.addInArray(this.transactions, tx);
        } else {
          this.addInArray(this.transactionsBig, tx);
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
    this.ws.onMessage('/topic/transactions', (m => Transaction.fromJson(m.body)))
      .subscribe(tx => {
        if (tx.amount < 1000) {
          this.addInArray(this.transactions, tx);
        } else {
          this.addInArray(this.transactionsBig, tx);
        }
        if (tx.confirmed && tx.lastPrice !== 0) {
          UniTxComponent.lastTx = tx;
        }
      });
  }

  private addInArray(arr: Transaction[], tx: Transaction): void {
    arr.unshift(tx);
    if (arr.length > this.maxMessages) {
      arr.pop();
    }
  }
}
