import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filling-layout',
  templateUrl: './filling-layout.component.html',
  styleUrls: ['./filling-layout.component.scss'],
})
export class FillingLayoutComponent implements OnInit {
  constructor() {}
  FillingName: string;
  ngOnInit() {
    this.FillingName = sessionStorage.getItem('FName');
  }
}
