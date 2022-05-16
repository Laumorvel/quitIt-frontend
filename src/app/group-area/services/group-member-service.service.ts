import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/public/interfaces/interfaces';
import { UserService } from 'src/app/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupMemberServiceService implements AsyncValidator{

  constructor(private userService: UserService) { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    throw new Error('Method not implemented.');
  }

  // validate(control: AbstractControl, grupo:User[]): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  //   const username = control.value;
  //   return this.searchFriendsFromGroup(username, grupo).pipe(
  //     map((resp) => {

  //     })
  //   );
  // }

  searchFriendsFromGroup(username: string, grupo:User[]){
    return this.userService.searchFriendsForGroup(username, grupo);
  }
}

