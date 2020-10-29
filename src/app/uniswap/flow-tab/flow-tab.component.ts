import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../models/transaction';

@Component({
  selector: 'app-flow-tab',
  templateUrl: './flow-tab.component.html',
  styleUrls: ['./flow-tab.component.css']
})
export class FlowTabComponent implements OnInit {
  @Input()  transactions: Transaction[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
