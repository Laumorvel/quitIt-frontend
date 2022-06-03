import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Group, GroupMember, User } from '../public/interfaces/interfaces';
import { UserService } from '../user/services/user.service';
import { FriendUsernameValidatorService } from './services/friend-username-validator.service';
import { GroupServiceService } from './services/group-service.service';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';

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
    private groupService: GroupServiceService,
    private accesibilityService: AccesibilityService
  ) {}

  //ATRIBUTOS
  crear: boolean = false;
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  groups: Group[] = [];
  newMemberForm: boolean = false;
  searchUsername: string = '';
  friendsFound: User[] = [];
  friendsSelected: User[] = [];
  groupMembers: GroupMember[] = [];
  noFriendsFound: boolean = false;
  save: boolean = false;
  newUser: boolean = false;
  showTable: boolean = true;
  userSelected!: User;
  search: string = '';
  memberAlreadyAddedMistake: boolean = false;
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;

  ngOnInit(): void {
    this.getUserData();
    this.myForm.reset({
      groupName: '',
      memberName: '',
    });
    this.getGroupsFromUser();

    this.accesibilityService.searchChangesBoolean().subscribe((opcion) =>{
      this.dyslexia = opcion;
    })
    this.accesibilityService.searchChangesCursor().subscribe((opcion) =>{
      this.cursor = opcion;
    })
    this.accesibilityService.searchChangesSpacing().subscribe(option => {
      this.spacing = option;
    })
  }

  //FORMULARIO
  myForm: FormGroup = this.fb.group({
    groupName: [, [Validators.required]],
    memberName: [, [Validators.required], [this.usernameFriendService]],
    admin: [,],
  });

  /**
   * Se añade el usuario seleccionado a la lista de amigos temporal del grupo.
   * Si no está ya en la lista de miembros temporales, se añade
   */
  pushMember() {
    this.friendsSelected.push(this.userSelected);
    this.groupMembers.push(this.crearMember());
    this.memberAlreadyAddedMistake = false;
  }

  crearGroup() {
    this.crear = true;
  }

  /**
   * Crea un miembro de grupo con la info proporcionada.
   * @returns miembro del grupo
   */
  crearMember(): GroupMember {
    let carg = this.myForm.get('admin')?.value == true ? 'AMDIN' : 'NO_ADMIN';
    const groupMember: GroupMember = {
      user: this.userSelected,
      cargo: carg,
    };
    return groupMember;
  }

  /**
   * Adquiere la info del usuario y la de sus grupos si los tuviera.
   */
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
   * Consigue todos los grupos de un usuario
   */
  getGroupsFromUser(){
    this.groupService.getGroupsFromUser().subscribe({
      next: (resp) => {
        this.groups = resp;
      },
      error: (resp) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: resp.error.mensaje,
          confirmButtonColor: '#52ab98',
        });
      },
    })
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
  get memberAlreadyAdded(): string {
    if (this.memberAlreadyAddedMistake) {
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
    this.userService
      .searchFriendsForGroup(
        this.myForm.get('memberName')?.value,
        this.friendsSelected
      )
      .subscribe({
        next: (resp) => {
          this.friendsFound = resp;
          this.showTable = true;
          if (resp.length == 0) {
            this.noFriendsFound = true;
          }
          this.checkFieldOfFriend();
        },
        error: (e) => {},
      });
  }

  /**
   * Creamos el grupo que vamos a enviar al back
   * y añadir a todos los usuarios seleccionados.
   * Se añade al propio usuario que crea el grupo como admin.
   */
  submitForm() {
    const selfUser: GroupMember = {
      user: this.user,
      cargo: "ADMIN",
    };
    this.groupMembers.push(selfUser);
    const group: Group = {
      name: this.myForm.get('groupName')?.value,
      groupMembers: this.groupMembers,
    };

    this.groupService.createGroup(group).subscribe({
      next: (resp) => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Group created!',
          confirmButtonColor: '#52ab98',
        });
          this.groups.push(resp);
        localStorage.setItem('user', JSON.stringify(this.user));
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Errors occurred whilst creating the group :(',
          confirmButtonColor: '#52ab98',
        });
      },
    });

    this.myForm.reset({
      groupName: '',
      memberName: '',
    });

    this.groupMembers = this.groupMembers.filter(f => f.id == 0);//elimina contenido del grupo
    this.friendsSelected = this.friendsSelected.filter(f => f.id == 0);
  }

  /**
   * Consigue al usuario que se corresponde con el username seleccionado.
   * @param event
   */
  selectFriend(event: any) {
    this.noFriendsFound = false;
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
  deleteMember(member:GroupMember) {
    const indexUser: number = this.friendsSelected.indexOf(member.user);
    const indexMember: number = this.groupMembers.indexOf(member);
    if (indexUser !== -1) {
    this.friendsSelected.splice(indexUser, 1);
      this.groupMembers.splice(indexMember, 1);
    }
  }

  /**
   * Comprueba que el username introducido en el miembro del equipo no se haya
   * agregado ya como amigo.
   *
   * setTimeout() :
   * Función creada para que no aparezca el error "NG0100: Expression has changed after it was checked".
   * Como angular no lo puede procesar suficientemente rápido y procesar su nuevo valor,
   * esta función hace que lo analice en el siguiente
   * macroTask del buscador y le de tiempo a cambiar el valor.
   * @returns boolean
   */
  checkFieldOfFriend() {
    let search = this.myForm.get('memberName')?.value;
    let canBeAdded =
      this.friendsSelected.filter((f) => f.username == search).length == 0
        ? true
        : false;
    this.memberAlreadyAddedMistake = canBeAdded ? false : true;

    return canBeAdded;
  }
}
