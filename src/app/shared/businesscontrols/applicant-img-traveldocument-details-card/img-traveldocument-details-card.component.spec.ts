import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgTraveldocumentDetailsCardComponent } from './img-traveldocument-details-card.component';

describe('ImgTraveldocumentDetailsCardComponent', () => {
  let component: ImgTraveldocumentDetailsCardComponent;
  let fixture: ComponentFixture<ImgTraveldocumentDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImgTraveldocumentDetailsCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgTraveldocumentDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
