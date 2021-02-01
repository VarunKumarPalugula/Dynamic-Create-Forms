import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynModelComponent } from './dyn-model.component';

describe('DynModelComponent', () => {
  let component: DynModelComponent;
  let fixture: ComponentFixture<DynModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
