import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User;
  nbreFiche: any;
  reponsesFiche = new Array();
  // test = new Array<number>();

  constructor(private menu: MenuController, private authService: AuthService) { 
    this.menu.enable(true);
    // delete this.nbreFiche;
    // this.reponsesFiche.length = 0;
  }

  // userReponse() {
  //   this.authService.userReponse(this.authService.getUser().id).subscribe(
  //     data => {
  //       console.log("Les infos passés !");
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  ngOnInit() {
    // delete this.nbreFiche;
    // this.reponsesFiche.length = 0;

    this.user = this.authService.getUser();
    // this.userReponse();
    // this.nbreFiche = this.authService.getNbreFiche();
    // this.reponsesFiche = this.authService.getReponsesUser();
    // alert(this.nbreFiche[0]['nbre']);
    // this.test = this.nbreFiche[0]['nbre'];
  }

  // ionViewWillEnter() {
  //   this.authService.user().subscribe(
  //     user => {
  //       this.user = user;
  //     }
  //   );
  // }

}
