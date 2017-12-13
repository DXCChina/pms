import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugManageComponent } from './bug-manage.component';

describe('BugManageComponent', () => {
  let component: BugManageComponent;
  let fixture: ComponentFixture<BugManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
