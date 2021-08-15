import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMyProductsComponent } from './manage-my-products.component';

describe('ManageMyProductsComponent', () => {
  let component: ManageMyProductsComponent;
  let fixture: ComponentFixture<ManageMyProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMyProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
