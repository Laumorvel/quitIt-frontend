import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/public/interfaces/interfaces';
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

  constructor(private userService: UserService) { }
  ngOnInit(): void {
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      ordering: true,
      order: [[2, 'asc']]
      
    };
    this.mostrarUsuarios();
  }


  /**
   * Recupera a todos los usarios de la base de datos
   */
  mostrarUsuarios(){
    this.userService.mostrarUsuarios().subscribe({
      next: (resp:any) => {
     //   console.log("ok");
     //   console.log(resp); 
        this.users=resp;
       console.log(this.users);
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
