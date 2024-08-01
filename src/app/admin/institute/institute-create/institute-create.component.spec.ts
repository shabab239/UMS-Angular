import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteCreateComponent } from './institute-create.component';

describe('InstituteCreateComponent', () => {
  let component: InstituteCreateComponent;
  let fixture: ComponentFixture<InstituteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstituteCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
