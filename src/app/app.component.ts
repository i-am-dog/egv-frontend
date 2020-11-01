import { Component } from '@angular/core';
import {GasChartComponent} from './chart/gasChart.component';
import {PriceChartComponent} from './chart/price-chart/price-chart.component';
import {UniTxComponent} from './uniswap/uni-tx/uni-tx.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ethgasviewer-front';

  get lastGas(): number {
    return UniTxComponent.lastTx.lastGas;
  }

  get lastPrice(): number {
    return UniTxComponent.lastTx.lastPrice;
  }
}
