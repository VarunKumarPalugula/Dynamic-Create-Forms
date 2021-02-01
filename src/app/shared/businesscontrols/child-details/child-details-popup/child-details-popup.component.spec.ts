import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDetailsPopupComponent } from './child-details-popup.component';

describe('ChildDetailsPopupComponent', () => {
  let component: ChildDetailsPopupComponent;
  let fixture: ComponentFixture<ChildDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
