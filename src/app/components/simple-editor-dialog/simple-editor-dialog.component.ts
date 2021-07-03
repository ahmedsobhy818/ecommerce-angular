import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-editor-dialog',
  templateUrl: './simple-editor-dialog.component.html',
  styleUrls: ['./simple-editor-dialog.component.css']
})
export class SimpleEditorDialogComponent {

  constructor(public dialogRef: MatDialogRef<SimpleEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {label:string , answer:string}) { 

    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
