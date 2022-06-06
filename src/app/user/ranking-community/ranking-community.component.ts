import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/public/interfaces/interfaces';
import { AccesibilityService } from 'src/app/shared/services/accesibility.service';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-ranking-community',
  templateUrl: './ranking-community.component.html',
  styleUrls: ['./ranking-community.component.css']
})
export class RankingCommunityComponent implements  OnDestroy, OnInit {

  users:User[]=[]

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dyslexia: boolean = false;
  cursor: boolean = false;
  spacing: boolean = false;


  constructor(private userService: UserService,private accesibilityService: AccesibilityService) { }
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      order: [[0, 'desc']]
    };
    this.mostrarUsuarios();
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


  /**
   * Recupera a todos los usarios de la base de datos
   */
  mostrarUsuarios(){
    this.userService.mostrarUsuarios().subscribe({
      next: (resp:any) => {
        this.users=resp;
        this.dtTrigger.next(null);
      },
      error: (e) => {
        Swal.fire({
          title:'Error',
          icon: 'error',
          text:'There are no services available at this time',
          confirmButtonColor:'#52ab98'
        });
      }
    }
  )}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
