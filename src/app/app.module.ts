import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {GasChartComponent} from './chart/gasChart.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {HttpClientModule} from '@angular/common/http';
import {HighchartsChartModule} from 'highcharts-angular';
import {PriceChartComponent} from './chart/price-chart/price-chart.component';
import {UniTxComponent} from './uniswap/uni-tx/uni-tx.component';
import {MatCardModule} from '@angular/material/card';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { FlowTabComponent } from './uniswap/flow-tab/flow-tab.component';
import { LastValuesComponent } from './chart/last-values/last-values.component';
import {MatIconModule} from '@angular/material/icon';
import { HarvestTxComponent } from './harvest/harvest-tx/harvest-tx.component';
import { HarvestFlowTabComponent } from './harvest/harvest-flow-tab/harvest-flow-tab.component';

declare var require: any;

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    GasChartComponent,
    PriceChartComponent,
    UniTxComponent,
    FlowTabComponent,
    LastValuesComponent,
    HarvestTxComponent,
    HarvestFlowTabComponent
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    HttpClientModule,
    HighchartsChartModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    }),
    BrowserAnimationsModule,
    MatCardModule,
    PerfectScrollbarModule,
    MatIconModule
  ],
  providers: [ {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
