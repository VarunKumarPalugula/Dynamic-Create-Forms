import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillingLayoutComponent } from './filling-layout.component';

describe('FillingLayoutComponent', () => {
  let component: FillingLayoutComponent;
  let fixture: ComponentFixture<FillingLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FillingLayoutComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
