import {AfterViewInit, Component} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {Transaction} from '../../models/transaction';
import {WsConsumer} from '../../services/ws-consumer';

@Component({
  selector: 'app-uni-tx',
  templateUrl: './uni-tx.component.html',
  styleUrls: ['./uni-tx.component.css']
})
export class UniTxComponent implements AfterViewInit, WsConsumer {
  static lastPrice = 0;
  static lastGas = 0;
  private maxMessages = 500;
  transactions: Transaction[] = [];
  transactionsBig: Transaction[] = [];
  subscribed = false;

  constructor(private ws: WebsocketService) {
  }

  setSubscribed(s: boolean): void {
    this.subscribed = s;
  }

  isSubscribed(): boolean {
    return this.subscribed;
  }

  ngAfterViewInit(): void {
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
          UniTxComponent.lastPrice = tx.lastPrice;
        }
        UniTxComponent.lastGas = tx.lastGas;
      });
  }

  private addInArray(arr: Transaction[], tx: Transaction): void {
    arr.unshift(tx);
    if (arr.length > this.maxMessages) {
      arr.pop();
    }
  }
}
