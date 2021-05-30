import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() loading:boolean=false;
  @Input() httploading:boolean=false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
