import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesGridComponent } from './absences-grid.component';

describe('ProjectsGridComponent', () => {
  let component: AbsencesGridComponent;
  let fixture: ComponentFixture<AbsencesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsencesGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsencesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
