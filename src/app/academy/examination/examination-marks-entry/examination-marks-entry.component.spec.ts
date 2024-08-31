import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationMarksEntryComponent } from './examination-marks-entry.component';

describe('ExaminationViewComponent', () => {
  let component: ExaminationMarksEntryComponent;
  let fixture: ComponentFixture<ExaminationMarksEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminationMarksEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationMarksEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
