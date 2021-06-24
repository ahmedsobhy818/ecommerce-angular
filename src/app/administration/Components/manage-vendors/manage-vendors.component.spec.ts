import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVendorsComponent } from './manage-vendors.component';

describe('ManageVendorsComponent', () => {
  let component: ManageVendorsComponent;
  let fixture: ComponentFixture<ManageVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageVendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
