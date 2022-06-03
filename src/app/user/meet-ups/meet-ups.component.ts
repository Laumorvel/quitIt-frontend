import { Component, OnInit } from '@angular/core';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';

@Component({
  selector: 'app-meet-ups',
  templateUrl: './meet-ups.component.html',
  styleUrls: ['./meet-ups.component.css']
})
export class MeetUpsComponent implements  OnInit {

  constructor(private accesibilityService: AccesibilityService) { }

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
