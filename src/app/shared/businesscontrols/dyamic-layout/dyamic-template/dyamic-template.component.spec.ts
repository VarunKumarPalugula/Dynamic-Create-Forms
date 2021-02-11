import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyamicTemplateComponent } from './dyamic-template.component';

describe('DyamicTemplateComponent', () => {
  let component: DyamicTemplateComponent;
  let fixture: ComponentFixture<DyamicTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DyamicTemplateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyamicTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
