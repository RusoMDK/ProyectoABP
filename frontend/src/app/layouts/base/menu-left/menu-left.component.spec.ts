import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuLeftComponent } from './menu-left.component';

describe('MenuLeftComponent', () => {
  let component: MenuLeftComponent;
  let fixture: ComponentFixture<MenuLeftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MenuLeftComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
