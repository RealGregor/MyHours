import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAbsenceModalContent } from './user-add-absence-modal.component';

describe('ProjectModalComponent', () => {
  let component: AddUserAbsenceModalContent;
  let fixture: ComponentFixture<AddUserAbsenceModalContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAbsenceModalContent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserAbsenceModalContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
