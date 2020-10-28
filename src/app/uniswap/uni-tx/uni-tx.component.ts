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
  private maxMessages = 500;
  transactions: Transaction[] = [];
  transactionsBig: Transaction[] = [];
  lastPrice = 0;

  constructor(private ws: WebsocketService) {
  }

  ngAfterViewInit(): void {
    this.initWs();
  }

  public initWs(): void {
    this.ws.onMessage('/topic/transactions', this, (m => Transaction.fromJson(m.body)))
      .subscribe(tx => {
        if (tx.amount < 1000) {
          this.transactions.push(tx);
          if (this.transactions.length > this.maxMessages) {
            this.transactions.shift();
          }
        } else {
          this.transactionsBig.push(tx);
          if (this.transactionsBig.length > this.maxMessages) {
            this.transactionsBig.shift();
          }
        }
        this.lastPrice = tx.lastPrice;
      });
  }

  public getLastPrice(): number {
    return this.lastPrice;
  }

}
