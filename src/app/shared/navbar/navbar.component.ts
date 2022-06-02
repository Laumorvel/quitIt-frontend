import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccesibilityService } from '../services/accesibility.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private accesibilityService: AccesibilityService) { }

  ngOnInit(): void {
  }

  @Input()menuIndicator:string = "";
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean  =false;

  dislexiaFriendly() {
    this.dyslexia = this.dyslexia ? false : true;
    this.accesibilityService.searchBoolean(this.dyslexia);
  }

  changeCursor(){
    this.cursor = this.cursor ? false : true;
    this.accesibilityService.searchCursor(this.cursor);
  }

  changeSpacing(){
    this.spacing = this.spacing ? false: true;
    this.accesibilityService.searchSpacing(this.spacing);
  }

  /**
   * Impide que se quede el menú con tipografía para disléxicos cuando el componente
   * mostrado en el router outlet no la tiene
   */
  detectClick(text: string){
    if(this.router.url.split('?')[0].split('/').pop() != text) this.dyslexia = false;
    if(this.router.url.split('?')[0].split('/').pop() != text) this.cursor = false;
  }


  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  /**
   * Cambiará las opciones de accesibilidad de la página.
   * Indicando qué opción se desea modificar.
   * @param type
   */

}
