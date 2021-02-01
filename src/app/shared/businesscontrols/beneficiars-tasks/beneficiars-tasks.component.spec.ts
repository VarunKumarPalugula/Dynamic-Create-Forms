import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiarsTasksComponent } from './beneficiars-tasks.component';

describe('BeneficiarsTasksComponent', () => {
  let component: BeneficiarsTasksComponent;
  let fixture: ComponentFixture<BeneficiarsTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficiarsTasksComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiarsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
