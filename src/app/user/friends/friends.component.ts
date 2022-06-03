import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  user: User = JSON.parse(<string>localStorage.getItem('user'));
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;

  constructor(private accesibilityService: AccesibilityService) { }

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

  checkmyfriendsVisible:boolean=true;
  newfriendsVisible:boolean=false;

  checkmyfriends(){
    this.checkmyfriendsVisible=true;
    this.newfriendsVisible=false;
  }

  newfriends(){
    this.checkmyfriendsVisible=false;
    this.newfriendsVisible=true;
  }

}
