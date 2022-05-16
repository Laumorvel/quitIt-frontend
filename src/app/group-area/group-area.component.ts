import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Group, GroupMember, User } from '../public/interfaces/interfaces';
import { UserService } from '../user/services/user.service';
import { FriendUsernameValidatorService } from './services/friend-username-validator.service';
import { GroupMemberServiceService } from './services/group-member-service.service';

@Component({
  selector: 'app-group-area',
  templateUrl: './group-area.component.html',
  styleUrls: ['./group-area.component.css'],
})
export class GroupAreaComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private usernameFriendService: FriendUsernameValidatorService,
    private groupMemberValidator: GroupMemberServiceService
  ) {}

  //ATRIBUTOS
  crear: boolean = false;
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  groups: Group[] = this.user.groupList;
  newMemberForm: boolean = false;
  searchUsername: string = '';
  friendsFound: User[] = [];
  friendsSelected: User[] = [];
  friendSelected: boolean = false;
  groupMembers: GroupMember[] = [];
  noFriendsFound: boolean = false;
  save: boolean = false;
  newUser: boolean = false;
  showTable: boolean = true;
  userSelected!: User;
  search: string = "";

  ngOnInit(): void {
    this.getUserData();
  }

  //FORMULARIO
  myForm: FormGroup = this.fb.group({
    groupName: [, [Validators.required]],
    memberName: [
      ,
      [Validators.required],
      [this.usernameFriendService],
    ],
    admin: [,],
  });

  /**
   * Se añade el usuario seleccionado a la lista de amigos temporal del grupo.
   * Si no está ya en la lista de miembros temporales, se añade
   */
  pushMember() {
    if(this.checkFieldOfFriend()){
    this.friendSelected = false;
      this.friendsSelected.push(this.userSelected);
      this.groupMembers.push(this.crearMember());
    }
  }

  crearGroup() {
    this.crear = true;
  }

  crearMember(): GroupMember {
    let carg = this.myForm.get('admin')?.value == true ? 'AMDIN' : 'NO_ADMIN';
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

  /**
   * Comunica los errores del campo memberName
   * - Si no se rellena
   * - Si el username no es amigo del usuario que crea el grupo o no existe
   * - Si ya se ha añadido a ese usuario como miembro del equipo
   */
  get memberNameError(): string {
    const errors = this.myForm.get('memberName')?.errors!;
    if (errors['required']) {
      return 'Username required';
    } else if (errors['usernameAmigo']) {
      return 'This username does not match any of your friends usernames';
    }
    return '';
  }

  /**
   * Comprueba que el campo de groupName se haya rellenado
   */
  get groupNameError(): string {
    const errors = this.myForm.get('groupName')?.errors!;
    if (errors['required']) {
      return 'Group name required';
    }
    return '';
  }

  /**
   * Si nungún miembro coincide con el buscado
   */
  get memberAlreadyAdded(): string{
    if(this.checkFieldOfFriend() == false){
      return 'Member already added to the group';
    }
    return '';
  }

  //CONTROL DE CAMPOS
  campoNoValido(campo: string) {
    return this.myForm.get(campo)?.invalid && this.myForm.get(campo)?.touched;
  }

  /**
   * Busca los usuarios que coincidan con el término introducido y ya sean amigos del usuario.
   * Descarta a aquellos que ya se haya seleccionado para formar parte del grupo.
   */
  searchFriend() {
    this.search = this.myForm.get('groupName')?.value;
    this.userService
      .searchFriendsForGroup(
        this.myForm.get('memberName')?.value,
        this.friendsSelected
      )
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
    this.myForm.get(`memberName`)?.setValue(friend.innerText); //setea el atributo en sí
    this.userSelected = this.friendsFound.filter(
      (f) => f.username == friend.innerText
    )[0]; //conseguimos el user seleccionado
  }

  addMember() {
    this.newUser = true;
    this.showTable = false;
  }

  /**
   * Elimina a un usuario de la lista temporal de amigos añadidos al grupo.
   */
  deleteMember() {
    const index: number = this.friendsSelected.indexOf(this.userSelected);
    if (index !== -1) {
      this.friendsSelected.splice(index, 1);
    }
  }

  /**
   * Comprueba que el username introducido en el miembro del equipo no se haya
   * agregado ya como amigo.
   * @returns boolean
   */
  checkFieldOfFriend(){
    let search = this.myForm.get('memberName')?.value;
    console.log(search)
    console.log(this.friendsSelected.filter(f => f.username == search).length == 0 )
    console.log(this.friendsSelected.filter(f => f.username == search))

  return this.friendsSelected.filter(f => f.username == search).length == 0 ? true : false;
  }




}
