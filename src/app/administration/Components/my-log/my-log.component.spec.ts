import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLogComponent } from './my-log.component';

describe('MyLogComponent', () => {
  let component: MyLogComponent;
  let fixture: ComponentFixture<MyLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
