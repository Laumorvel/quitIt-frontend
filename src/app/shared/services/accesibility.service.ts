import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Esta clase devolverá un observable con el que poder realizar
 * cambios respecto a la accesibilidad de la aplicación.
 */
@Injectable({
  providedIn: 'root',
})
export class AccesibilityService {
  constructor() {}

  //DYSLEXIA
  private readonly searchChangesBoolean$ = new Subject<boolean>();

  searchBoolean(type: boolean): void {
    this.searchChangesBoolean$.next(type);
  }

  searchChangesBoolean(): Observable<boolean> {
    return this.searchChangesBoolean$.asObservable();
  }

  //CURSOR
  private readonly searchChangesCursor$ = new Subject<boolean>();

  searchCursor(type: boolean): void {
    this.searchChangesCursor$.next(type);
  }

  searchChangesCursor(): Observable<boolean> {
    return this.searchChangesCursor$.asObservable();
  }


  //LETTER SPACING
  private readonly searchChangesSpacingr$ = new Subject<boolean>();

  searchSpacing(type: boolean): void {
    this.searchChangesSpacingr$.next(type);
  }

  searchChangesSpacing(): Observable<boolean> {
    return this.searchChangesSpacingr$.asObservable();
  }
}
