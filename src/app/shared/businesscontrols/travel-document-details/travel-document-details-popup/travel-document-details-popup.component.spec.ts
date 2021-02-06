import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDocumentDetailsPopupComponent } from './travel-document-details-popup.component';

describe('TravelDocumentDetailsPopupComponent', () => {
  let component: TravelDocumentDetailsPopupComponent;
  let fixture: ComponentFixture<TravelDocumentDetailsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelDocumentDetailsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelDocumentDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
