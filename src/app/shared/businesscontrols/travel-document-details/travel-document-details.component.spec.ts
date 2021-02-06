import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDocumentDetailsComponent } from './travel-document-details.component';

describe('TravelDocumentDetailsComponent', () => {
  let component: TravelDocumentDetailsComponent;
  let fixture: ComponentFixture<TravelDocumentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelDocumentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelDocumentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
