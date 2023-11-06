import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNavbarComponent } from './create-navbar.component';

describe('CreateNavbarComponent', () => {
  let component: CreateNavbarComponent;
  let fixture: ComponentFixture<CreateNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNavbarComponent]
    });
    fixture = TestBed.createComponent(CreateNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
