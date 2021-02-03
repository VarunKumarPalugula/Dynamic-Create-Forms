import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  @Input() templateTableDta: any;
  @Output() emitDisplayTitle = new EventEmitter();
  @Input() filingTypes: any;

  sortFilter: string
  constructor() { }

  ngOnInit(): void {
  }

  sortFilingType(value) {
    this.sortFilter = value
  }
  viewTemplate(displayTitle) {
    this.emitDisplayTitle.emit(displayTitle)
  }

}
