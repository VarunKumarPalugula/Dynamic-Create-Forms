import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-model',
  templateUrl: './card-model.component.html',
  styleUrls: ['./card-model.component.css'],
})
export class CardModelComponent implements OnInit {
  @Input() data: any;
  @Input() title: any;

  @Output() cardMode = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }

  returnZero() {
    return 0;
  }

  changes() {
    this.cardMode.emit();
  }
}
