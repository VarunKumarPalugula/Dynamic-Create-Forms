import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyamicLayoutComponent } from './dyamic-layout.component';

describe('DyamicLayoutComponent', () => {
  let component: DyamicLayoutComponent;
  let fixture: ComponentFixture<DyamicLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DyamicLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyamicLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
