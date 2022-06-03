import { Component, OnInit } from '@angular/core';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private accesibilityService: AccesibilityService) {}

  ngOnInit(): void {
    this.accesibilityService.searchChangesBoolean().subscribe(text =>{
        this.dyslexia = text;
    })
    this.accesibilityService.searchChangesCursor().subscribe(option => {
      this.cursor = option;
    })
    this.accesibilityService.searchChangesSpacing().subscribe(option => {
      this.spacing = option;
    })
  }

  fontSize = 20;
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;


  changeFont(operator: any) {
    operator === '+' ? this.fontSize++ : this.fontSize--;
    document.getElementsByTagName(
      'h2'
    )[0].style.fontSize = `${this.fontSize}px`;
    document.getElementsByTagName(
      'h2'
    )[1].style.fontSize = `${this.fontSize}px`;
  }
}
