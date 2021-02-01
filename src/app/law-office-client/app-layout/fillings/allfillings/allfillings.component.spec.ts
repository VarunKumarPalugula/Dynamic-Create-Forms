import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfillingsComponent } from './allfillings.component';

describe('AllfillingsComponent', () => {
  let component: AllfillingsComponent;
  let fixture: ComponentFixture<AllfillingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllfillingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllfillingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
