import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {HarvestTxComponent} from '../../harvest/harvest-tx/harvest-tx.component';

@Component({
  selector: 'app-dashboard-last-values',
  templateUrl: './dashboard-last-values.component.html',
  styleUrls: ['./dashboard-last-values.component.css']
})
export class DashboardLastValuesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  get lastGasF(): number {
    if (AppComponent.lastGas != null) {
      return AppComponent.lastGas;
    }
    return 0;
  }

  get lastPriceF(): number {
    if (AppComponent.lastPrice != null) {
      return AppComponent.lastPrice;
    }
    return 0.0;
  }

  get allTvlF(): number {
    let allTvl = 0;
    HarvestTxComponent.harvestTvls.forEach((tvl: number, vault: string) => {
      allTvl += tvl;
    });
    return allTvl / 1000000;
  }

  get tvls(): Map<string, number> {
    return HarvestTxComponent.harvestTvls;
  }
}
