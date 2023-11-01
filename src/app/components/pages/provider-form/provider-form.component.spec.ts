import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderFormComponent } from './provider-form.component';

describe('ProviderFormComponent', () => {
  let component: ProviderFormComponent;
  let fixture: ComponentFixture<ProviderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderFormComponent]
    });
    fixture = TestBed.createComponent(ProviderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
