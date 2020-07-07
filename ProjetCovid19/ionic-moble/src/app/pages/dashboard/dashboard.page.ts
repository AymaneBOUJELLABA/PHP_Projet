import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user: User = undefined;
  nbreFiche: any;
  reponsesFiche = new Array();
  hasInfo = '';
  info : any = undefined;

  constructor(private menu: MenuController,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertService: AlertService,
              private modalController: ModalController,
              ) { 
    this.menu.enable(true);

    if(this.authService.userValue != undefined)
    {
      this.user = this.authService.userValue;
      this.authService.hasInfos(this.authService.userValue.id).subscribe(
      data => {
        this.info = data['info'];
      },
      err => {
        console.log(err);
        
      }
      )
    }
    
  }


  ngOnInit()
  {
    this.user = this.authService.userValue;
    this.info = undefined;
    this.authService.hasInfos(this.authService.userValue.id).subscribe(
      data => {
        this.info = data['info'];
        console.log(this.info);
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
    if(this.user==undefined)
    {
      this.alertService.presentToast("Vous vous n'êtes pas connecter");
      this.navCtrl.navigateRoot('/landing');
      this.modalController.dismiss()
    }
  }

  
}
