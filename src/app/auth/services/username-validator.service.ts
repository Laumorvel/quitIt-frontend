import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/public/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsernameValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const username = control.value;
    return this.compruebaUsername(username).pipe(
      map (resp => {
        if(resp.username != null){
          return {usernameCogido: true};
        }else{
          return null;
         }
      }),
      catchError (err => {
        return of(null);
      })
    )
  }

  /**
   * Método para comprobar username en BBDD
   * @param username 
   * @returns 
   */
  compruebaUsername(username: string) {
    const url = `${this.baseUrl}/email?username=${username}`;
    return this.http.get<User>(url);
  }

}
