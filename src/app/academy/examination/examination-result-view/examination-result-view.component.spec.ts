import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExaminationResultViewComponent } from './examination-result-view.component';

describe('ExaminationResultViewComponent', () => {
  let component: ExaminationResultViewComponent;
  let fixture: ComponentFixture<ExaminationResultViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExaminationResultViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExaminationResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
