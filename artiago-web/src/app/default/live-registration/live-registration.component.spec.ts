import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRegistrationComponent } from './live-registration.component';

describe('LiveRegistrationComponent', () => {
  let component: LiveRegistrationComponent;
  let fixture: ComponentFixture<LiveRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
