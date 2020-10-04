import { Component, OnInit } from '@angular/core';
import {ChartOptions} from '../ChartOptions';
import {NGXLogger} from 'ngx-logger';
import {Utils} from '../../utils';
import {Gas} from '../../models/gas';
import * as Highcharts from 'highcharts/highstock';
import {PriceService} from '../../services/price.service';
import {Price} from '../../models/price';

@Component({
  selector: 'app-price-chart',
  templateUrl: './price-chart.component.html',
  styleUrls: ['./price-chart.component.css']
})
export class PriceChartComponent implements OnInit {
  static lastPrice;
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'stockChart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = ChartOptions.getOptions(); // required
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false
  lastDate = -1;

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
  }; // optional function, defaults to null

  constructor(private priceService: PriceService, private log: NGXLogger) {
  }

  ngOnInit(): void {
    this.chartOptions.title.text = 'FARM Price';
    this.chartOptions.series[0].name = 'Price';
    this.priceService.getHistoryData().subscribe(data => {
      Utils.loadingOff();
      this.log.info('data got', data);
      this.addValuesToChart(data);
    }, err => {
      Utils.loadingOff();
    });

    setInterval(() => this.collectLastData(), 10000);
  }

  private collectLastData(): void {
    if (this.lastDate === -1) {
      this.log.info('First data Price not collected');
      return;
    }
    this.log.info('Collect last data price from ' + new Date(this.lastDate));
    this.priceService.getLastData(this.lastDate.toString()).subscribe(data => {
      Utils.loadingOff();
      this.addValuesToChart(data);
    }, err => {
      Utils.loadingOff();
    });
  }

  private addValuesToChart(gasInfos: Price[]): void {
    gasInfos?.forEach(data => {
      if (data.acquired > this.lastDate) {
        this.lastDate = data.acquired;
      }
      this.updateSeries(0, data.price, data.acquired);
      PriceChartComponent.lastPrice = data.price;
      this.updateFlag = true;
    });
  }

  private updateSeries(i: number, value: number, date: number): void {
    const series: any = this.chartOptions.series[i];
    series.data.push([date, Number(value.toFixed(2))]);
  }
}
