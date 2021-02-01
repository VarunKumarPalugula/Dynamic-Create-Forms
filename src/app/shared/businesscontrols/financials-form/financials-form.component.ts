import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'financials-form',
  templateUrl: './financials-form.component.html',
  styleUrls: ['./financials-form.component.scss'],
})
export class FinancialsFormComponent implements OnInit {
  @Input()
  financials: FormGroup;
  @Input()
  financialObj: any = {};
  @Input()
  currentYearIncome: any = {};
  @Input()
  previousYearIncome: any = {};

  @Output()
  emitSubmitFinancialInfo = new EventEmitter();
  @Output()
  backToFinacialCard = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  financialsInformation() {
    this.emitSubmitFinancialInfo.emit();
  }
  BackToFinancialCard() {
    this.backToFinacialCard.emit();
  }
}
