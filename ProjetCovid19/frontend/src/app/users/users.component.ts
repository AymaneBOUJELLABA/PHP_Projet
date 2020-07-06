import { AlertService } from './../alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { User, ConnectedUser, LoginUser } from './users';
import { first } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  form : FormGroup
  connectedUser : ConnectedUser;
  message = null;
  loading = false;
  submitted = false;
  failed = false;
  constructor(
    private usersService : UsersService,
    private Router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
  )
  {

  }

  ngOnInit()
  {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.connectedUser = this.usersService.userValue;
  }

  get f() { return this.form.controls; }
  getConnectedUser()
  {

  }

  login(Email : string , Password : string)
  {
    this.submitted = true
    this.loading=true;

    this.alertService.clear();

    if (this.form.invalid) {
      return;
  }
    Email = Email.trim();
    Password = Password.trim();

    this.usersService.login(Email,Password)
    .pipe(first())
    .subscribe(
        data => {
            this.alertService.success('You have successfully logged in', { keepAfterRouteChange: true })
            this.connectedUser = this.usersService.userValue;
            this.Router.navigate(['Dashboard']);
        },
        err => {
            this.alertService.error(err);
            this.failed = true;
            this.message = "Invalid Informations, please try again";
            this.loading = false;
        });
  }
}
