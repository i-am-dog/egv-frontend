import { Component } from '@angular/core';
import {GasChartComponent} from './chart/gasChart.component';
import {PriceChartComponent} from './chart/price-chart/price-chart.component';
import {UniTxComponent} from './uniswap/uni-tx/uni-tx.component';
import {UniswapDto} from './models/uniswapDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public static lastPrice = 0.0;
  public static lastGas = 0;
  public static lastBlockDateAdopted = new Date(0);
  title = 'ethgasviewer-front';

  get lastGas(): number {
    return AppComponent.lastGas;
  }

  get lastPrice(): number {
    return AppComponent.lastPrice;
  }
}
