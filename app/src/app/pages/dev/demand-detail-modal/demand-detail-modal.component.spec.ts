import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandDetailModalComponent } from './demand-detail-modal.component';

describe('DemandDetailModalComponent', () => {
  let component: DemandDetailModalComponent;
  let fixture: ComponentFixture<DemandDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
