import {Component, OnInit} from '@angular/core';
import {UniTxComponent} from '../../uniswap/uni-tx/uni-tx.component';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-last-values',
  templateUrl: './last-values.component.html',
  styleUrls: ['./last-values.component.css']
})
export class LastValuesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  get lastGas(): string {
    return AppComponent.lastGas.toFixed(2);
  }

  get lastPrice(): string {
    return AppComponent.lastPrice.toFixed(2);
  }

}
