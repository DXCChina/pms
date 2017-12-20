import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandDetailComponent } from './demand-detail.component';

describe('DemandDetailComponent', () => {
  let component: DemandDetailComponent;
  let fixture: ComponentFixture<DemandDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
