import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {



  @Input()nombre:string ="";
  @Output()sendObjetivos = new EventEmitter<number[]>();
  objetivos:number[] = [];

  constructor(
    private accesibilityService: AccesibilityService
  ) {}

  dyslexia: boolean = false;

  ngOnInit(): void {
    this.accesibilityService.searchChanges().subscribe((text) => {
      if (text == 'dyslexia') {
        this.dyslexia = this.dyslexia ? false : true;
      }
    });
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
