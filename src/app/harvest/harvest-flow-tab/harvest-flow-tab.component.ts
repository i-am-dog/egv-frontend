import {Component, Input, OnInit} from '@angular/core';
import {UniswapDto} from '../../models/uniswapDto';
import {HarvestDto} from '../../models/harvest-dto';

@Component({
  selector: 'app-harvest-flow-tab',
  templateUrl: './harvest-flow-tab.component.html',
  styleUrls: ['./harvest-flow-tab.component.css']
})
export class HarvestFlowTabComponent implements OnInit {

  @Input() dtos: HarvestDto[] = [];
  @Input() maxHeight = 800;

  constructor() {
  }

  ngOnInit(): void {
  }

  priceGradient(type: string, amount: number, success: boolean): string {
    if (success) {
      switch (type.toLowerCase()) {
        case 'deposit':
          if (amount > 500) {
            return '#83b78c';
          } else if (amount > 250) {
            return '#9ab7a0';
          } else if (amount > 100) {
            return '#788579';
          } else {
            return '#4b544c';
          }
        case 'withdraw':
          if (amount > 500) {
            return '#c15b5b';
          } else if (amount > 250) {
            return '#8f5d5d';
          } else if (amount > 100) {
            return '#694545';
          } else {
            return '#583e3e';
          }
      }
    } else {
      return '#474646';
    }
    return '#ffffff';
  }

}
