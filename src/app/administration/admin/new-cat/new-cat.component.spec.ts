import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCatComponent } from './new-cat.component';

describe('NewCatComponent', () => {
  let component: NewCatComponent;
  let fixture: ComponentFixture<NewCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
