import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  cont: number = 0;
  friendSelected: boolean = false;
  groupmembers: GroupMember[] = [];
  noFriendsFound:boolean = false;
  save: boolean = false;
  newUser: boolean = false;
  showTable: boolean = true;
  userSelected!: User;

  //FORMULARIO
  myForm: FormGroup = this.fb.group({
    memberName: [, [Validators.required]],
    groupName: [, [Validators.required]]
  });

  ngOnInit(): void {
    this.getUserData();
  }

  crearGroup() {
    this.crear = true;
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

  showNewMemberForm() {
    this.newMemberForm = true;
    //this.cont += 1; //para comprobar que se están escogiendo bien los usenames
    this.friendSelected = false;
  }

  get memberNameError(): string {
    const errors = this.myForm.get('memberName')?.errors!;
    if (errors['required']) {
      return 'Username required';
    } else if (errors['']) {
      //servicio de validación de username de amigos
      return '';
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

  campoNoValido(campo: string) {
    return this.myForm.get(campo)?.invalid && this.myForm.get(campo)?.touched;
  }

  /**
   * Busca los usuarios que coincidan con el término introducido y ya sean amigos del usuario.
   */
  searchFriend() {
    this.userService.searchFriends(this.myForm.get('memberName')?.value).subscribe({
      next: (resp) => {
        this.friendsFound = resp;
        this.showTable = true;
        if(resp.length == 0){
          this.noFriendsFound = true;
        }
      },
      error: (e) => {

       console.log(e)
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'There are no results that match your search',
          confirmButtonColor: '##52ab98',
        });
      },
    });
  }

  submitForm(){

  }

  selectFriend(event:any){
    this.noFriendsFound = false;
    this.friendSelected = true;
    this.showTable= false;
    let friend = event.target;
    this.myForm.controls['memberName'].setValue(friend.innerText);//se setea el valor del atributo del formulario "memberName" al clicado
    this.userSelected = this.friendsFound.filter(f => f.username==friend.innerText)[0];//conseguimos el user seleccionado
  }

  addMember(){
    this.newUser = true;
    this.showTable = false;
  }
}
