import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSetDetailComponent } from './dev-set-detail.component';

describe('DevSetDetailComponent', () => {
  let component: DevSetDetailComponent;
  let fixture: ComponentFixture<DevSetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevSetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevSetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
