import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandManageComponent } from './demand-manage.component';

describe('DemandManageComponent', () => {
  let component: DemandManageComponent;
  let fixture: ComponentFixture<DemandManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
