import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss'],
})
export class CardFooterComponent implements OnInit {
  @Input()
  cardFooterTittle: string;
  constructor() {}

  ngOnInit() {}
}
