import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRecoveryComponent } from './log-recovery.component';

describe('LogRecoveryComponent', () => {
  let component: LogRecoveryComponent;
  let fixture: ComponentFixture<LogRecoveryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogRecoveryComponent],
    });
    fixture = TestBed.createComponent(LogRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
