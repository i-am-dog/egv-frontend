import {Component, OnInit} from '@angular/core';
import {UniTxComponent} from '../../uniswap/uni-tx/uni-tx.component';

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
    return UniTxComponent.lastGas?.toFixed(0);
  }

  get lastPrice(): string {
    return UniTxComponent.lastPrice?.toFixed(2);
  }

}
