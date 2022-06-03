import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group, GroupMember, User } from '../../public/interfaces/interfaces';
import { GroupServiceService } from '../services/group-service.service';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';

@Component({
  selector: 'app-ranking-group',
  templateUrl: './ranking-group.component.html',
  styleUrls: ['./ranking-group.component.css']
})
export class RankingGroupComponent implements OnInit, OnChanges {

  constructor( private rutaActiva: ActivatedRoute,private accesibilityService: AccesibilityService,
    private groupService: GroupServiceService,) { }

/**
 * Se ejecutará cada vez que el valor del @Input cambie en el padre.
 * Esto es cada vez que se añada un nuevo miembro al grupo.
 */
  ngOnChanges() {
    this.getGroupFromUser();
    this.reload = false;
  }

  ngOnInit(): void {
    this.getGroupFromUser();
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

  @Input() reload: boolean = false;
  members: GroupMember[] = [];
  membersUsers: User[]=[];
  id = this.rutaActiva.snapshot.params['id'];
  group!: Group;
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;


  /**
   * Consigue el grupo en el que se ha clicado por el parámetro de la ruta
   * También saca la lista de usuarios que conforman el grupo para poder hacer las
   * comprobaciones necesarias a la hora de añadir a un usuario como miembro del grupo.
   */
   getGroupFromUser() {
    this.groupService.getGroup(this.id).subscribe({
      next: (resp) => {
        this.group = resp;
        this.members = [];
        this.membersUsers = [];
        resp.groupMembers.forEach(member => {
          this.membersUsers.push(member.user);
          this.members.push(member);
        });
        this.sortArray()
      },
      error: (resp) => {
      },
    });
  }

/**
 * Ordena el array de miembros para mostrarlos en orden descendente en el ranking
 */
  sortArray(){
    this.members.sort((a,b) => {
      return b.user.daysInARowWithoutSmoking - a.user.daysInARowWithoutSmoking;
    })
  }

}
