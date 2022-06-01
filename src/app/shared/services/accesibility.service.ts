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
  private readonly searchChanges$ = new Subject<string>();
  constructor() {}

  search(type: string): void {
    this.searchChanges$.next(type);
  }

  searchChanges(): Observable<string> {
    return this.searchChanges$.asObservable();
  }

  private readonly searchChangesBoolean$ = new Subject<boolean>();

  searchBoolean(type: boolean): void {
    this.searchChangesBoolean$.next(type);
  }

  searchChangesBoolean(): Observable<boolean> {
    return this.searchChangesBoolean$.asObservable();
  }

  private readonly searchChangesCursor$ = new Subject<boolean>();

  searchCursor(type: boolean): void {
    this.searchChangesBoolean$.next(type);
  }

  searchChangesCursor(): Observable<boolean> {
    return this.searchChangesBoolean$.asObservable();
  }
}
