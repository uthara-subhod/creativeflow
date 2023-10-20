import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CworksComponent } from './cworks.component';

describe('CworksComponent', () => {
  let component: CworksComponent;
  let fixture: ComponentFixture<CworksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CworksComponent]
    });
    fixture = TestBed.createComponent(CworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
