import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Esta clase devolverá un observable con el que poder realizar
 * cambios respecto a la accesibilidad de la aplicación.
 */
@Injectable({
  providedIn: 'root'
})
export class AccesibilityService {
  private readonly searchChanges$ = new Subject<string>();
  constructor() { }

  search(type: string): void {
    this.searchChanges$.next(type);
}

searchChanges(): Observable<string> {
    return this.searchChanges$.asObservable();
}
}
