import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  
  
  @Input()nombre:string ="";
  @Output()sendObjetivos = new EventEmitter<number[]>();
  objetivos:number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  cigarettesBeforePerDay!:number;
  moneyPerDay!:number;

  /**
   * Consigue y envía por el decorador output los objetivos del usuario que se registra
   */
  enviaObjetivos(){
    this.objetivos.push(this.cigarettesBeforePerDay, this.moneyPerDay);
    this.sendObjetivos.emit(this.objetivos);
  }

}
