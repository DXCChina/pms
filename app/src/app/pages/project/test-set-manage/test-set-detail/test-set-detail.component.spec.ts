import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSetDetailComponent } from './test-set-detail.component';

describe('TestSetDetailComponent', () => {
  let component: TestSetDetailComponent;
  let fixture: ComponentFixture<TestSetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
