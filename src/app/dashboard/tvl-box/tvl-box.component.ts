import {Component, Input, OnInit} from '@angular/core';
import {HarvestTxComponent} from '../../harvest/harvest-tx/harvest-tx.component';

@Component({
  selector: 'app-tvl-box',
  templateUrl: './tvl-box.component.html',
  styleUrls: ['./tvl-box.component.css']
})
export class TvlBoxComponent implements OnInit {
  @Input() tvlName;

  public static getImgSrc(name: string): string {
    switch (name) {
      case 'UNI_ETH_DAI':
        return 'https://harvest.finance/icons/eth_dai.svg';
      case 'UNI_ETH_USDC':
        return 'https://harvest.finance/icons/eth_usdc.svg';
      case 'UNI_ETH_USDT':
        return 'https://harvest.finance/icons/eth_usdt.svg';
      case 'UNI_ETH_WBTC':
        return 'https://harvest.finance/icons/eth_wbtc.svg';
      case 'WETH':
        return 'https://harvest.finance/icons/eth.png';
      case 'USDC':
        return 'https://harvest.finance/icons/usdc.png';
      case 'USDT':
        return 'https://harvest.finance/icons/usdt.png';
      case 'DAI':
        return 'https://harvest.finance/icons/dai.svg';
      case 'WBTC':
        return 'https://harvest.finance/icons/wbtc.png';
      case 'RENBTC':
        return 'https://harvest.finance/icons/ren.png';
      case 'CRVRENWBTC':
        return 'https://harvest.finance/icons/crvrenwbtc.png';
      case 'SUSHI_WBTC_TBTC':
        return 'https://harvest.finance/icons/sushi_wbtc.svg';
      case 'YCRV':
        return 'https://harvest.finance/icons/curve.png';
      case '3CRV':
        return 'https://harvest.finance/icons/three-pool.png';
      case 'TUSD':
        return 'https://harvest.finance/icons/tusd.png';
      case 'FARM':
        return 'https://harvest.finance/icons/farm.png';
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  get tvls(): Map<string, number> {
    return HarvestTxComponent.harvestTvls;
  }

  getImgSrc(name: string): string {
      return TvlBoxComponent.getImgSrc(name);
  }

}
