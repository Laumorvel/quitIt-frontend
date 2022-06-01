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
    this.dyslexia = false;
  }

  @Input()menuIndicator:string = "";
  dyslexia: boolean = false;
  shown: boolean = false;

  dropDown() {
   this.shown = this.shown ? false : true;
  }


  dislexiaFriendly() {
    this.dyslexia = this.dyslexia ? false : true;
    this.accesibilityService.search('dyslexia');
    this.accesibilityService.searchBoolean(this.dyslexia);
  }

  /**
   * Impide que se quede el menú con tipografía para disléxicos cuando el componente
   * mostrado en el router outlet no la tiene
   */
  detectClick(text: string){
    if(this.router.url.split('?')[0].split('/').pop() != text) this.dyslexia = false;
  }

  changeFont(operator: any) {
    // operator === '+' ? this.fontSize++ : this.fontSize--;
    // document.getElementsByTagName(
    //   'h2'
    // )[0].style.fontSize = `${this.fontSize}px`;
    // document.getElementsByTagName(
    //   'h2'
    // )[1].style.fontSize = `${this.fontSize}px`;
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
  changeAccesibilityOptions(type: string){
    this.accesibilityService.search(type);
  }

}
