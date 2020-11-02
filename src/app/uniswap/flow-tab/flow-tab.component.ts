import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../models/transaction';

@Component({
  selector: 'app-flow-tab',
  templateUrl: './flow-tab.component.html',
  styleUrls: ['./flow-tab.component.css']
})
export class FlowTabComponent implements OnInit {
  @Input() transactions: Transaction[] = [];
  @Input() maxHeight = 800;

  constructor() {
  }

  ngOnInit(): void {
  }

  priceGradient(type: string, amount: number, success: boolean): string {
    if (success) {
      switch (type) {
        case 'ADD':
        case 'BUY':
          if (amount > 500) {
            return '#83b78c';
          } else if (amount > 250) {
            return '#9ab7a0';
          } else if (amount > 100) {
            return '#788579';
          } else {
            return '#4b544c';
          }
        case 'SELL':
        case 'REM':
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
