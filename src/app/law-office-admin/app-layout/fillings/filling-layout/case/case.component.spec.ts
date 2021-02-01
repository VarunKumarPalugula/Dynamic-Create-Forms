import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseComponent } from '@app/law-office-admin/app-layout/fillings/filling-layout/case/case.component';

describe('CaseComponent', () => {
  let component: CaseComponent;
  let fixture: ComponentFixture<CaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
