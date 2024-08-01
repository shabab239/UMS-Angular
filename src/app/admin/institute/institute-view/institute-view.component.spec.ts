import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteViewComponent } from './institute-view.component';

describe('InstituteViewComponent', () => {
  let component: InstituteViewComponent;
  let fixture: ComponentFixture<InstituteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstituteViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
