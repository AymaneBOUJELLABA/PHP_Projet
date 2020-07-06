import { AlertService } from './../alert.service';
import { ConnectedUser } from './../users/users';
import { UsersService } from './../users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user : ConnectedUser = null;
  isConnected = false;
  constructor(
    private usersService : UsersService,
    private router: Router,
    private alertService: AlertService,
  ) {}
  
  ngOnInit()
  {
    this.user = this.usersService.userValue;
    this.isConnected=this.checkConnected();
    
  }
  checkConnected()
  {
    this.user = this.usersService.userValue;
    if(this.user)
    {
      return this.isConnected = true;
    }
    else 
      return false
  }
  logout()
  {
    this.user = null;
    this.isConnected = false;
    this.alertService.success('You have logged out successfully', { keepAfterRouteChange: true });
    this.usersService.logout();
  }
  

}
