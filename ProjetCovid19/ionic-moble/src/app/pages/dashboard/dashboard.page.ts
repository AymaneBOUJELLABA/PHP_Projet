import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
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
  hasInfo = '';

  constructor(private menu: MenuController,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertService: AlertService,
              ) { 
    this.menu.enable(true);

  }


  ngOnInit() {

    this.user = this.authService.getUser();

    this.authService.hasInfos(this.authService.userValue.id).subscribe(
      data => {
        this.hasInfo = data['hasInfos'];
        if(this.hasInfo=='true')
          this.navCtrl.navigateRoot('/dashboard');
        if(this.hasInfo=='false')
          {
            this.alertService.presentToast("Vous n'avez pas saisie vos informations");
            this.navCtrl.navigateRoot('/infos');
          }
      },
      err => {
        console.log(err);
        
      }
    )  
   
  }
}
