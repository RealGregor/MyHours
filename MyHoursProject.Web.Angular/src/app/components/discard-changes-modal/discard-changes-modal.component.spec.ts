import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardChangesModalComponent } from './discard-changes-modal.component';

describe('DiscardChangesModalComponent', () => {
  let component: DiscardChangesModalComponent;
  let fixture: ComponentFixture<DiscardChangesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscardChangesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscardChangesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
