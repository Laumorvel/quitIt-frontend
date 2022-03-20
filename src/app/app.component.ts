import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public subscriber!: Subscription;

  registeredUserRoutes: string[] = [
    'groupArea',
    'userArea',
    'settings',
    'friends',
    'meetUps',
    'achievements',
    'penalties',
    'rankingCommunity',
    'commentsCommunity',
  ];
  userNotRegisteredRoutes: string[] = [
    'login',
    'register',
    'home',
    'contactUs',
    ''
  ];
  administratorRoutes: string[] = ['administratorDashboard'];
  menuIndicator: string = ''; //atributo usado como @Input para mostrar un menú u otro. Los valores serán 'administrator', 'registeredUser', 'userNotRegistered'
  /**
   * Comprueba todos los cambios que se producen en la ruta-
   * De esta manera podemos mostrar un menú y otro enviando el valor indicado del atributo "registrado".
   * @param router
   */
  constructor(private router: Router) {
    this.subscriber = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.checkRoute();
      });
  }

  ngOnDestroy() {
    this.subscriber?.unsubscribe();
  }

  /**
   * Método para comprobar las rutas y asignar el valor al atributo que determina el tipo de menú que se mostrará.
   */
  checkRoute() {
    let route = this.router.url.split('?')[0].split('/').pop(); //consigo la última parte de la url
    if (route != undefined) {
      //es necesario hacer esta comprobación para que no nos diga que puede ser undefined
      if (this.administratorRoutes.includes(route)) {
        this.menuIndicator = 'administrator';
      } else if (this.userNotRegisteredRoutes.includes(route)) {
        this.menuIndicator = 'userNotRegistered';
      } else {
        this.menuIndicator = 'registeredUser';
      }
    }
  }
}
