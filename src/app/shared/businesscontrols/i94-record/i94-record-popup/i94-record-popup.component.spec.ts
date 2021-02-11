import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I94RecordPopupComponent } from './i94-record-popup.component';

describe('I94RecordPopupComponent', () => {
  let component: I94RecordPopupComponent;
  let fixture: ComponentFixture<I94RecordPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [I94RecordPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I94RecordPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
