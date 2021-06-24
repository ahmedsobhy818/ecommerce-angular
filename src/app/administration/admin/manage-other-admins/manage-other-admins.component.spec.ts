import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOtherAdminsComponent } from './manage-other-admins.component';

describe('ManageOtherAdminsComponent', () => {
  let component: ManageOtherAdminsComponent;
  let fixture: ComponentFixture<ManageOtherAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOtherAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOtherAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
