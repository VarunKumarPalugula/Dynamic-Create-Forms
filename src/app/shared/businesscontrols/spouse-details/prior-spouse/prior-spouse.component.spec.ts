import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorSpouseComponent } from './prior-spouse.component';

describe('PriorSpouseComponent', () => {
  let component: PriorSpouseComponent;
  let fixture: ComponentFixture<PriorSpouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorSpouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorSpouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
