import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseManageComponent } from './release-manage.component';

describe('ReleaseManageComponent', () => {
  let component: ReleaseManageComponent;
  let fixture: ComponentFixture<ReleaseManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
