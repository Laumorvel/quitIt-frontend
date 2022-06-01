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
    this.accesibilityService.searchChanges().subscribe(text =>{
      if(text == 'dyslexia'){
        this.dyslexia = this.dyslexia ? false : true;
      }
    })
  }

  fontSize = 20;
  dyslexia: boolean = false;
  shown: boolean = false;

  dropDown() {
   this.shown = this.shown ? false : true;
  }


  dislexiaFriendly() {
    this.dyslexia = this.dyslexia ? false : true;
  }

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
