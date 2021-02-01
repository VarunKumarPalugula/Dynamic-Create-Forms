import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeaminvitlistComponent } from '@app/shared/businesscontrols/teaminvitlist/teaminvitlist.component';

describe('TeaminvitlistComponent', () => {
  let component: TeaminvitlistComponent;
  let fixture: ComponentFixture<TeaminvitlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeaminvitlistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeaminvitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
