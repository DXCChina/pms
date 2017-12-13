import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSetManageComponent } from './dev-set-manage.component';

describe('DevSetManageComponent', () => {
  let component: DevSetManageComponent;
  let fixture: ComponentFixture<DevSetManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevSetManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevSetManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
