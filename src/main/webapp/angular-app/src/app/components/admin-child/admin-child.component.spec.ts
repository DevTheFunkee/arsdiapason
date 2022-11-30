import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChildComponent } from './admin-child.component';

describe('AdminChildComponent', () => {
  let component: AdminChildComponent;
  let fixture: ComponentFixture<AdminChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
