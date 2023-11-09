import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAgreeComponent } from './request-agree.component';

describe('RequestAgreeComponent', () => {
  let component: RequestAgreeComponent;
  let fixture: ComponentFixture<RequestAgreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestAgreeComponent]
    });
    fixture = TestBed.createComponent(RequestAgreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
