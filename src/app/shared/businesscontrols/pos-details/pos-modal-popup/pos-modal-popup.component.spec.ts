import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosModalPopupComponent } from './pos-modal-popup.component';

describe('PosModalPopupComponent', () => {
  let component: PosModalPopupComponent;
  let fixture: ComponentFixture<PosModalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosModalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
