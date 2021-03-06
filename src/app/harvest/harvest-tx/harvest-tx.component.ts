import {AfterViewInit, Component} from '@angular/core';
import {WebsocketService} from '../../services/websocket.service';
import {TxHistoryService} from '../../services/tx-history.service';
import {NGXLogger} from 'ngx-logger';
import {AppComponent} from '../../app.component';
import {HarvestDto} from '../../models/harvest-dto';
import {WsConsumer} from '../../services/ws-consumer';
import {Utils} from '../../utils';

@Component({
  selector: 'app-harvest-tx',
  templateUrl: './harvest-tx.component.html',
  styleUrls: ['./harvest-tx.component.css']
})
export class HarvestTxComponent implements AfterViewInit, WsConsumer {
  public static harvestTvls = new Map<string, number>();
  private maxMessages = 500;
  dtos: HarvestDto[] = [];
  subscribed = false;
  txIds = new Set<string>();
  vaultFilter;

  constructor(private ws: WebsocketService,
              private txHistory: TxHistoryService,
              private log: NGXLogger) {
    HarvestTxComponent.harvestTvls.set('UNI_ETH_DAI', 0);
    HarvestTxComponent.harvestTvls.set('UNI_ETH_USDC', 0);
    HarvestTxComponent.harvestTvls.set('UNI_ETH_USDT', 0);
    HarvestTxComponent.harvestTvls.set('UNI_ETH_WBTC', 0);
    HarvestTxComponent.harvestTvls.set('WETH', 0);
    HarvestTxComponent.harvestTvls.set('USDC', 0);
    HarvestTxComponent.harvestTvls.set('USDT', 0);
    HarvestTxComponent.harvestTvls.set('DAI', 0);
    HarvestTxComponent.harvestTvls.set('WBTC', 0);
    HarvestTxComponent.harvestTvls.set('RENBTC', 0);
    HarvestTxComponent.harvestTvls.set('CRVRENWBTC', 0);
    HarvestTxComponent.harvestTvls.set('SUSHI_WBTC_TBTC', 0);
    HarvestTxComponent.harvestTvls.set('YCRV', 0);
    HarvestTxComponent.harvestTvls.set('3CRV', 0);
    HarvestTxComponent.harvestTvls.set('TUSD', 0);
    HarvestTxComponent.harvestTvls.set('FARM', 0);
  }

  private static saveLastValue(tx: HarvestDto): void {
    if (!tx.confirmed) {
      return;
    }
    if (tx.lastGas != null && (tx.lastGas + '') !== 'NaN' && tx.lastGas !== 0) {
      AppComponent.lastGas = tx.lastGas;
    }
  }

  setSubscribed(s: boolean): void {
    this.subscribed = s;
  }

  isSubscribed(): boolean {
    return this.subscribed;
  }

  ngAfterViewInit(): void {
    this.txHistory.getHarvestTxHistoryData().subscribe(data => {
      Utils.loadingOff();
      this.log.info('harvest data fetched', data);
      data.forEach(tx => {
        HarvestDto.round(tx);
        HarvestTxComponent.saveLastValue(tx);
        this.addInArray(this.dtos, tx);
      });
    }, err => {
      Utils.loadingOff();
    });
    this.initWs();
  }

  public initWs(): void {
    if (this.ws.registerConsumer(this) && !this.subscribed) {
      this.subscribeToTopic();
    }
  }

  public subscribeToTopic(): void {
    this.subscribed = true;
    this.ws.onMessage('/topic/harvest', (m => HarvestDto.fromJson(m.body)))
      .subscribe(tx => {
        if (!this.isUniqTx(tx)) {
          this.log.error('Not unique', tx);
          return;
        }
        this.addInArray(this.dtos, tx);
        HarvestTxComponent.saveLastValue(tx);
      });
  }

  private isUniqTx(tx: HarvestDto): boolean {
    if (this.txIds.has(tx.id)) {
      return false;
    }
    this.txIds.add(tx.id);
    if (this.txIds.size > 100_000) {
      this.txIds = new Set<string>();
    }
    return true;
  }

  private addInArray(arr: HarvestDto[], tx: HarvestDto): void {
    HarvestTxComponent.harvestTvls.set(tx.vault, tx.lastUsdTvl);
    arr.unshift(tx);
    if (arr.length > this.maxMessages) {
      arr.pop();
    }
  }

  get tvlNames(): IterableIterator<string> {
    return HarvestTxComponent.harvestTvls.keys();
  }
}
