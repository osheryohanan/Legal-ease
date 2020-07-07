import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHourMeetingComponent } from './select-hour-meeting.component';

describe('SelectHourMeetingComponent', () => {
  let component: SelectHourMeetingComponent;
  let fixture: ComponentFixture<SelectHourMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectHourMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHourMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
