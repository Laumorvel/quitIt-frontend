import { Component, OnInit } from '@angular/core';

import { AccesibilityService } from 'src/app/shared/services/accesibility.service';
@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.css']
})
export class ShowImageComponent implements OnInit {

  constructor(private accesibilityService: AccesibilityService) { }

  clicked: boolean = false;
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;

  ngOnInit(): void {
    this.accesibilityService.searchChangesBoolean().subscribe((opcion) =>{
      this.dyslexia = opcion;
    })
    this.accesibilityService.searchChangesCursor().subscribe((opcion) =>{
      this.cursor = opcion;
    })
    this.accesibilityService.searchChangesSpacing().subscribe(option => {
      this.spacing = option;
    })
  }

}
