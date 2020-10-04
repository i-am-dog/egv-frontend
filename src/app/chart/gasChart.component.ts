import {Component, OnInit} from '@angular/core';
import {ChartOptions} from './ChartOptions';
import {GasService} from '../services/gas.service';
import {Utils} from '../utils';
import {Gas} from '../models/gas';
import * as Highcharts from 'highcharts/highstock';
import {NGXLogger} from 'ngx-logger';

// https://www.npmjs.com/package/angular2-highcharts
@Component({
  selector: 'app-gas-chart',
  templateUrl: './gasChart.component.html',
  styleUrls: ['./gasChart.component.css']
})
export class GasChartComponent implements OnInit {
  static lastAverageGas;
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'stockChart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = ChartOptions.getOptions(); // required
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngular = false; // optional boolean, defaults to false
  lastDate = -1;

  chartCallback: Highcharts.ChartCallbackFunction = chart => {
  }; // optional function, defaults to null

  constructor(private gasService: GasService, private log: NGXLogger) {
  }

  ngOnInit(): void {
    this.gasService.getHistoryData().subscribe(data => {
      Utils.loadingOff();
      this.addGasInfoToChart(data);
    }, err => {
      Utils.loadingOff();
    });

    setInterval(() => this.collectLastData(), 60000);
  }

  private collectLastData(): void {
    if (this.lastDate === -1) {
      this.log.info('First data not collected');
      return;
    }
    this.log.info('Collect last data from ' + new Date(this.lastDate));
    this.gasService.getLastData(this.lastDate.toString()).subscribe(data => {
      Utils.loadingOff();
      this.addGasInfoToChart(data);
    }, err => {
      Utils.loadingOff();
    });
  }

  private addGasInfoToChart(gasInfos: Gas[]): void {
    gasInfos?.forEach(gas => {
      if (gas.acquired > this.lastDate) {
        this.lastDate = gas.acquired;
      }
      this.updateSeries(0, gas.safeLow, gas.acquired);
      this.updateSeries(1, gas.average, gas.acquired);
      this.updateSeries(2, gas.fast, gas.acquired);
      GasChartComponent.lastAverageGas = gas.average;
      this.updateFlag = true;
    });
  }

  private updateSeries(i: number, value: number, date: number): void {
    const series: any = this.chartOptions.series[i];
    series.data.push([date, value / 10]);
  }

}
