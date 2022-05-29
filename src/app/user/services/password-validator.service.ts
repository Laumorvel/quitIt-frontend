import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from 'src/app/public/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService implements AsyncValidator {

  
  constructor(private http: HttpClient) {}

  private baseUrl: string = environment.baseUrl;

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const password = control.value;
    return this.compruebapassword(password).pipe(
      map (resp => {
        if(resp.password != null){
          return {passwordCogido: true};
        }else{
          return null;
         }
      }),
      catchError (err => {
        return of(err);
      })
    )
  }

  /**
   * Método para comprobar password en BBDD
   * @param password 
   * @returns 
   */
   compruebapassword(password: string) {
    const url = `${this.baseUrl}/email?password=${password}`;
    let token = JSON.parse(<string>localStorage.getItem('token'));
      const opcion = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      opcion.append('Access-Control-Allow-Origin', '*');
    return this.http.get<User>(url,{ headers: opcion });
   }


   
}
