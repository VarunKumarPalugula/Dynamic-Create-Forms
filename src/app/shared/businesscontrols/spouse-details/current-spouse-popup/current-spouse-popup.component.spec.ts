import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSpousePopupComponent } from './current-spouse-popup.component';

describe('CurrentSpousePopupComponent', () => {
  let component: CurrentSpousePopupComponent;
  let fixture: ComponentFixture<CurrentSpousePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentSpousePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentSpousePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
