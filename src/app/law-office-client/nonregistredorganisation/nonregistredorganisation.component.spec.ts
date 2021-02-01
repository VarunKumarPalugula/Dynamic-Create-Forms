import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonregistredorganisationComponent } from './nonregistredorganisation.component';

describe('NonregistredorganisationComponent', () => {
  let component: NonregistredorganisationComponent;
  let fixture: ComponentFixture<NonregistredorganisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NonregistredorganisationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonregistredorganisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
