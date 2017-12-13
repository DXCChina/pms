import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetManageComponent } from './test-set-manage.component';

describe('TestSetManageComponent', () => {
  let component: TestSetManageComponent;
  let fixture: ComponentFixture<TestSetManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
