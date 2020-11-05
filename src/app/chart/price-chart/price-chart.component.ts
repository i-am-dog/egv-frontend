import { Component, OnInit } from '@angular/core';
import {ChartOptions} from '../ChartOptions';
import {NGXLogger} from 'ngx-logger';
import {Utils} from '../../utils';
import * as Highcharts from 'highcharts/highstock';
import {PriceService} from '../../services/price.service';
import {Price} from '../../models/price';
import {UniTxComponent} from '../../uniswap/uni-tx/uni-tx.component';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'stockChart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = ChartOptions.getOptions(); // required
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false
  lastDate = -1;
  lastUpdatedPrice = 0.0;

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
  } // optional function, defaults to null

  constructor(private priceService: PriceService, private log: NGXLogger) {
  }

  ngOnInit(): void {
    this.chartOptions.title.text = null;
    this.chartOptions.series[0].name = 'Price';
    this.chartOptions.series[0].color = '#dddddd';
    this.priceService.getHistoryData().subscribe(data => {
      Utils.loadingOff();
      this.log.info('History of prices loaded, size ', data.length);
      this.addValuesToChart(data);
    }, err => {
      Utils.loadingOff();
    });

    setInterval(() => this.collectLastUniTx(), 5000);
    // setInterval(() => this.collectLastData(), 10000);
  }

  private collectLastUniTx(): void {
    if (this.lastDate === -1) {
      this.log.info('First data Price not collected');
      return;
    }
    if (AppComponent.lastPrice !== this.lastUpdatedPrice) {
      this.lastUpdatedPrice = AppComponent.lastPrice;
    } else {
      return;
    }
    const priceArr: Price[] = [];
    const price = new Price();
    price.price = AppComponent.lastPrice;
    price.acquired = AppComponent.lastBlockDateAdopted.getTime();
    price.volume = 0;
    priceArr.push(price);
    this.addValuesToChart(priceArr);
  }

  public addValuesToChart(prices: Price[]): void {
    prices?.forEach(data => {
      if (data.acquired > this.lastDate) {
        this.lastDate = data.acquired;
      }
      this.updateSeries(0, data.price, data.acquired);
      this.updateFlag = true;
    });
  }

  private updateSeries(i: number, value: number, date: number): void {
    const series: any = this.chartOptions.series[i];
    series.data.push([date, Number(value.toFixed(2))]);
  }
}
