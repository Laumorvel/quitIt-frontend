import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-area',
  templateUrl: './group-area.component.html',
  styleUrls: ['./group-area.component.css']
})
export class GroupAreaComponent implements OnInit {

  constructor() { }

  crear: boolean = false;

  ngOnInit(): void {
  }

  crearGroup(){
    this.crear = true;
  }

}
