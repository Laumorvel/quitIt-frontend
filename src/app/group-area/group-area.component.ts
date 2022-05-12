import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Group, GroupMember, User } from '../public/interfaces/interfaces';
import { UserService } from '../user/services/user.service';
import { FriendUsernameValidatorService } from './services/friend-username-validator.service';

@Component({
  selector: 'app-group-area',
  templateUrl: './group-area.component.html',
  styleUrls: ['./group-area.component.css'],
})
export class GroupAreaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private usernameFriendService: FriendUsernameValidatorService
  ) {}

  //ATRIBUTOS
  crear: boolean = false;
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  groups: Group[] = this.user.groupList;
  newMemberForm: boolean = false;
  searchUsername: string = '';
  friendsFound: User[] = [];
  friendSelected: boolean = false;
  groupMembers: GroupMember[] = [];
  noFriendsFound: boolean = false;
  save: boolean = false;
  newUser: boolean = false;
  showTable: boolean = true;
  userSelected!: User;

  ngOnInit(): void {
    this.getUserData();
  }

  //FORMULARIO
  myForm: FormGroup = this.fb.group({
    groupName: [, [Validators.required]],
    memberName: [, [Validators.required]],
    admin: [,],
  });

  pushMember() {
    this.friendSelected = false;
    this.groupMembers.push(this.crearMember());
  }

  crearGroup() {
    this.crear = true;
  }

  crearMember(): GroupMember {
    console.log(this.myForm.get('admin')?.value)
    let carg = this.myForm.get('admin')?.value ==true ? 'AMDIN' : 'NO_ADMIN';
    const groupMember: GroupMember = {
      id: 0,
      user: this.userSelected,
      cargo: carg,
    };
    return groupMember;
  }

  getUserData() {
    this.userService.updateUser().subscribe({
      next: (resp) => {
        this.user = resp;
      },
      error: (resp) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.error.mensaje,
          confirmButtonColor: '#52ab98',
        });
      },
    });
  }

  // showNewMemberForm() {
  //   this.newMemberForm = true;
  //   this.cont += 1; //para comprobar que se están escogiendo bien los usenames
  //   this.friendSelected = false;
  // }

  get memberNameError(): string {
    const errors = this.myForm.get('memberName')?.errors!;
    if (errors['required']) {
      return 'Username required';
    } else if (errors['usernameAmigo']) {
      return 'This username does not match any of your friends usernames';
    }
    return '';
  }

  get groupNameError(): string {
    const errors = this.myForm.get('groupName')?.errors!;
    if (errors['required']) {
      return 'Group name required';
    }
    return '';
  }

  //CONTROL DE CAMPOS
  campoNoValido(campo: string) {
    return this.myForm.get(campo)?.invalid && this.myForm.get(campo)?.touched;
  }

  // //CONTROL DE CAMPOS DEL ARRAY DE MIEMBROS
  // campoNoValidoArray(campo: string, i: number) {
  //   let cadena = `members.${i}.${campo}`;
  //   return this.myForm.get(cadena)?.invalid && this.myForm.get(cadena)?.touched;
  // }

  /**
   * Busca los usuarios que coincidan con el término introducido y ya sean amigos del usuario.
   */
  searchFriend() {
    this.userService
      .searchFriends(this.myForm.get('memberName')?.value)
      .subscribe({
        next: (resp) => {
          console.log(resp)
          this.friendsFound = resp;
          this.showTable = true;
          if (resp.length == 0) {
            this.noFriendsFound = true;
          }
        },
        error: (e) => {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'There are no results that match your search',
            confirmButtonColor: '##52ab98',
          });
        },
      });
  }

  submitForm() {}

  selectFriend(event: any) {
    this.noFriendsFound = false;
    this.friendSelected = true;
    this.showTable = false;
    let friend = event.target;
    this.myForm.controls[`memberName`].setValue(friend.innerText); //se setea el valor del atributo del formulario "memberName" al clicado
    this.userSelected = this.friendsFound.filter(
      (f) => f.username == friend.innerText
    )[0]; //conseguimos el user seleccionado
  }

  addMember() {
    this.newUser = true;
    this.showTable = false;
  }

  deleteMember(){

  }
}
