import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIstitutiComponent } from './admin-istituti.component';

describe('AdminIstitutiComponent', () => {
  let component: AdminIstitutiComponent;
  let fixture: ComponentFixture<AdminIstitutiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIstitutiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIstitutiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
