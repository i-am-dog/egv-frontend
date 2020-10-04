import { Component } from '@angular/core';
import {GasChartComponent} from './chart/gasChart.component';
import {PriceChartComponent} from './chart/price-chart/price-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ethgasviewer-front';

  get lastGasValue(): number {
    return GasChartComponent.lastAverageGas / 10;
  }

  get lastPrice(): number {
    return PriceChartComponent.lastPrice.toFixed(2);
  }
}
