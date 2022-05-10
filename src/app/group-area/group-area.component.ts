import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Group, User } from '../public/interfaces/interfaces';
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

  myForm: FormGroup = this.fb.group({
    memberName: [, [Validators.required], [this.usernameFriendService]],
    groupName:[,[Validators.required]]
  });

  crear: boolean = false;
  groupName: string = '';
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  groups: Group[] = this.user.groupList;
  newMemberForm: boolean = false;

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
  }

  get memberNameError(): string {
    const errors = this.myForm.get('memberName')?.errors!;
    if (errors['required']) {
      return 'Name required';
    } else if (errors['']) {//servicio de validación de username de amigos
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
}
