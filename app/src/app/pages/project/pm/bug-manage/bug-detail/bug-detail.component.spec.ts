import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BugDetailComponent } from './bug-detail.component';

describe('BugDetailComponent', () => {
  let component: BugDetailComponent;
  let fixture: ComponentFixture<BugDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BugDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BugDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
