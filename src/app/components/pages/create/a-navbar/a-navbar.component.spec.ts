import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ANavbarComponent } from './a-navbar.component';

describe('ANavbarComponent', () => {
  let component: ANavbarComponent;
  let fixture: ComponentFixture<ANavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ANavbarComponent]
    });
    fixture = TestBed.createComponent(ANavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
