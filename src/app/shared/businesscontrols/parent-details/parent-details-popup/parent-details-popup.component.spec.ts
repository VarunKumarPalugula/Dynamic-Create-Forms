import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDetailsPopupComponent } from './parent-details-popup.component';

describe('ParentDetailsPopupComponent', () => {
  let component: ParentDetailsPopupComponent;
  let fixture: ComponentFixture<ParentDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentDetailsPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
