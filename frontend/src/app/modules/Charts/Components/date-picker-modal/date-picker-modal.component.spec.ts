import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerModalComponent } from './date-picker-modal.component';

describe('DatePickerModalComponent', () => {
  let component: DatePickerModalComponent;
  let fixture: ComponentFixture<DatePickerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatePickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
