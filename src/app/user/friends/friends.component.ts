import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  user: User = JSON.parse(<string>localStorage.getItem('user'));

  constructor() { }

  ngOnInit(): void {
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
