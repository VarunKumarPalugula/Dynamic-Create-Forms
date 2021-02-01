import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewfillingComponent } from './newfilling.component';

describe('NewfillingComponent', () => {
  let component: NewfillingComponent;
  let fixture: ComponentFixture<NewfillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewfillingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewfillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
