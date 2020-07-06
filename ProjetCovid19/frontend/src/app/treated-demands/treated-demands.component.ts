import { AlertService } from './../alert.service';
import { UsersService } from './../users.service';
import { DemandsService } from './../demands.service';
import { Observable } from 'rxjs';
import { demand } from './demands';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-treated-demands',
  templateUrl: './treated-demands.component.html',
  styleUrls: ['./treated-demands.component.css']
})
export class TreatedDemandsComponent implements OnInit {

  demands : demand[];

  constructor(
    private demandsService : DemandsService,
    private usersService : UsersService,
    private alertService : AlertService,
    )
    { 
      this.demands = [];
    }

  ngOnInit()
  {
      this.demandsService.getTreatedDemands()
          .pipe(first())
          .subscribe(demands => this.demands = demands);
  }
}
