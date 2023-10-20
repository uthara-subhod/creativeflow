import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MListComponent } from './m-list.component';

describe('MListComponent', () => {
  let component: MListComponent;
  let fixture: ComponentFixture<MListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MListComponent]
    });
    fixture = TestBed.createComponent(MListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
