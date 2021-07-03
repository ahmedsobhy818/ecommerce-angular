import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleEditorDialogComponent } from './simple-editor-dialog.component';

describe('SimpleEditorDialogComponent', () => {
  let component: SimpleEditorDialogComponent;
  let fixture: ComponentFixture<SimpleEditorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleEditorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
