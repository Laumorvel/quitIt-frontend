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
  dtTrigger= new Subject<any>();


  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.mostrarUsuarios();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  mostrarUsuarios(){
    this.userService.mostrarUsuarios().subscribe(resp =>{
      this.users = resp;
      console.log(resp)
    })
  }
  
}
