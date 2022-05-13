import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class FriendUsernameValidatorService implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const username = control.value;
    return this.compruebaUsername(username).pipe(
      map((resp) => {
        console.log(resp)
        if (resp.filter((f) => f.username == username)) {
          return { usernameAmigo: true };
        } else {
          return null;
        }
      }),
      catchError((err) => {
        return of(null);
      })
    );
  }

  /**
   * Recoge los amigos del usuario que coincidan con el username (búsqueda) introducido
   * @param username
   * @returns lista de usuarios coincidentes
   */
  compruebaUsername(username: string) {
    return this.userService.searchFriends(username);
  }
}
