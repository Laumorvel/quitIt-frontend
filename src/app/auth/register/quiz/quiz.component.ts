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
  cursor: boolean = false;
  spacing: boolean = false;

  ngOnInit(): void {
    this.accesibilityService.searchChangesBoolean().subscribe((text) => {
        this.dyslexia = text;
    });

    this.accesibilityService.searchChangesCursor().subscribe(option => {
      this.cursor = option;
    })
    this.accesibilityService.searchChangesSpacing().subscribe(option => {
      this.spacing = option;
    })
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
