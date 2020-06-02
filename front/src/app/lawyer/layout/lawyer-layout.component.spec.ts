import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerLayoutComponent } from './lawyer-layout.component';

describe('LawyerLayoutComponent', () => {
  let component: LawyerLayoutComponent;
  let fixture: ComponentFixture<LawyerLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawyerLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawyerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
