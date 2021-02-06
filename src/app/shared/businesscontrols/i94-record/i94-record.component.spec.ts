import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I94RecordComponent } from './i94-record.component';

describe('I94RecordComponent', () => {
  let component: I94RecordComponent;
  let fixture: ComponentFixture<I94RecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ I94RecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I94RecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
