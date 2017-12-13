import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDetailModalComponent } from './case-detail-modal.component';

describe('CaseDetailModalComponent', () => {
  let component: CaseDetailModalComponent;
  let fixture: ComponentFixture<CaseDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
