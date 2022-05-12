import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MeetUP } from 'src/app/public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-meet-ups',
  templateUrl: './meet-ups.component.html',
  styleUrls: ['./meet-ups.component.css']
})
export class MeetUpsComponent implements  OnInit {

  constructor() { }

  ngOnInit(): void {}

 
  showMeetUpsVisible:boolean=true;
  createMeetUpsVisible:boolean=false;

  showMeetUps(){
    this.showMeetUpsVisible=true;
    this.createMeetUpsVisible=false;
  }

  createMeetUps(){
    this.showMeetUpsVisible=false;
    this.createMeetUpsVisible=true;
  }
  
}
