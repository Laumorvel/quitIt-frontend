import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupServiceService } from '../services/group-service.service';
import { Group, GroupMember, User } from '../../public/interfaces/interfaces';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FriendUsernameValidatorService } from '../services/friend-username-validator.service';
import { UserService } from 'src/app/user/services/user.service';
import { GroupMemberService } from '../services/group-member.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private usernameFriendService: FriendUsernameValidatorService,
    private fb: FormBuilder,
    private rutaActiva: ActivatedRoute,
    private groupService: GroupServiceService,
    private groupMemberService: GroupMemberService
  ) {}

  ngOnInit(): void {
    this.getGroupFromUser();
    this.myForm.reset({
      groupName: '',
      memberName: '',
    });
  }

  //ATRIBUTOS
  myForm: FormGroup = this.fb.group({
    memberName: [, [Validators.required], [this.usernameFriendService]],
    admin: [,],
  });
  group!: Group;
  id = this.rutaActiva.snapshot.params['id'];
  user: User = JSON.parse(<string>localStorage.getItem('user'));
  add: boolean = false;
  friendsFound: User[] = [];
  friendsSelected: User[] = [];
  noFriendsFound: boolean = false;
  search: string = '';
  showTable: boolean = true;
  memberAlreadyAddedMistake: boolean = false;
  userSelected!: User;
  newUser: boolean = false;
  reload: boolean = false;

  /**
   * Consigue el grupo en el que se ha clicado por el parámetro de la ruta
   * También saca la lista de usuarios que conforman el grupo para poder hacer las
   * comprobaciones necesarias a la hora de añadir a un usuario como miembro del grupo.
   */
  getGroupFromUser() {
    this.groupService.getGroup(this.id).subscribe({
      next: (resp) => {
        this.group = resp;
        resp.groupMembers.forEach(member => {
          this.friendsSelected.push(member.user);
        });
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
 * Consigue al miembro del grupo del usuario.
 * Si lo encuentra, devuelve true
 */
  checkUsersRole(): boolean{
    const userMember: GroupMember = this.group.groupMembers.filter(f => f.user.username == this.user.username)[0];
    return userMember.cargo == 'ADMIN';
  }

  /**
   * Si el usuario se va a salir del grupo entonces el método contendrá un parámetro.
   * @param oneSelf
   */
  deleteMember(oneSelf? : string){

  }

  deleteGroup(){

  }

  /**
   * Comprueba si el usuario es o no administrador
   * para cambiar el cargo del usuario.
   * @returns boolean
   */
  compruebaCargoUser(): boolean {
    return this.group.groupMembers.filter(
      (m) => m.user.username == this.user.username
    )[0].cargo == 'ADMIN'
      ? true
      : false;
  }

  /**
   * Se añade el usuario seleccionado a la lista de amigos temporal del grupo.
   * Si no está ya en la lista de miembros temporales, se añade
   */
   pushMember() {
    this.crearMember();
    this.memberAlreadyAddedMistake = false;
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
   * Busca los usuarios que coincidan con el término introducido y ya sean amigos del usuario sin formar parte del grupo.
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

  /**
   * Creamos el grupo que vamos a enviar al back
   * y añadir a todos los usuarios seleccionados.
   * Se añade al propio usuario que crea el grupo como admin.
   */
   submitForm() {
    this.memberAlreadyAddedMistake = false;
    this.groupMemberService.addNewMemberToGroup(this.crearMember(), +this.id).subscribe({
      next: (resp) => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          text: 'Member added!',
          confirmButtonColor: '#52ab98',
        });
        this.getGroupFromUser();
        localStorage.setItem('user', JSON.stringify(this.user));
        this.reload = true;
      },
      error: (e) => {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Errors occurred whilst adding the new member to the group :(',
          confirmButtonColor: '#52ab98',
        });
      },
    })

    this.myForm.reset({
      groupName: '',
      memberName: '',
    });
  }

}
