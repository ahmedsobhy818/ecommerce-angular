import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMyStocksComponent } from './manage-my-stocks.component';

describe('ManageMyStocksComponent', () => {
  let component: ManageMyStocksComponent;
  let fixture: ComponentFixture<ManageMyStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageMyStocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMyStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
