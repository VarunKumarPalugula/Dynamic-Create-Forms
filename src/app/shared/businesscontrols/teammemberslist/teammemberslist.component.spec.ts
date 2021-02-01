import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammemberslistComponent } from '@app/shared/businesscontrols/teammemberslist/teammemberslist.component';

describe('TeammemberslistComponent', () => {
  let component: TeammemberslistComponent;
  let fixture: ComponentFixture<TeammemberslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeammemberslistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeammemberslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
