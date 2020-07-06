import { Router, ActivatedRoute } from '@angular/router';
import { demand } from './../treated-demands/demands';
import { AlertService } from './../alert.service';
import { UsersService } from './../users.service';
import { DemandsService } from './../demands.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-not-treated-demands',
  templateUrl: './not-treated-demands.component.html',
  styleUrls: ['./not-treated-demands.component.css']
})
export class NotTreatedDemandsComponent implements OnInit {

  demands : demand[] = [];
  treatedDemand : demand;
  isTreated=false;
  constructor(
    private demandsService : DemandsService,
    private usersService : UsersService,
    private alertService : AlertService,
    private router : Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
      this.demandsService.getNotTreatedDemands()
          .pipe(first())
          .subscribe(demands => this.demands = demands);
  }


  edit(demand:demand)
  {
    this.treatedDemand = demand;
    this.isTreated = true;
  }

  update()
  {
    if(this.treatedDemand)
    {
      //definir que cette demande est traité
      this.treatedDemand.isTreated=1;

      this.demandsService.updateDemand(this.treatedDemand).subscribe(demand =>{
        const ix = demand ? this.demands.findIndex(h => h.user_id= demand.user_id) : -1;
        if(ix > -1)
        {
          this.demands[ix] = demand;
        }
      })

      this.treatedDemand = undefined;
      this.isTreated = false;

      //reload page
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
    };
  }
}
