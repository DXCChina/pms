import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestManageComponent } from './test-manage.component';

describe('TestManageComponent', () => {
  let component: TestManageComponent;
  let fixture: ComponentFixture<TestManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
