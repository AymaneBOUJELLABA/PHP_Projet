import { AlertService } from 'src/app/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, NavController } from '@ionic/angular';
import { RegisterPage } from '../auth/register/register.page';
import { LoginPage } from '../auth/login/login.page';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  IsConnected = false;
  constructor(
    private modalController: ModalController,
    private menu: MenuController,
    private authService: AuthService,
    private alertService: AlertService,
    private navCtrl: NavController,
  ) { 
      this.menu.enable(false);
    }

    ionViewWillEnter() {
      this.authService.getToken().then(() => {
        if(this.authService.isLoggedIn) {
          this.navCtrl.navigateRoot('/dashboard');
        }
      });
    }

    ngOnInit()
    {
      this.UserIsConnected();
    }


    UserIsConnected()
    {
      
      if(this.authService.userValue != undefined)
      {
        this.IsConnected = true;
        this.navCtrl.navigateRoot('/dashboard');
        this.alertService.presentToast('Vous êtes dèja connecté');
        this.modalController.dismiss();
        
      }

    }
    async register() {
      const registerModal = await this.modalController.create({
        component: RegisterPage
      });
      return await registerModal.present();
    }

    async login() {
      const loginModal = await this.modalController.create({
        component: LoginPage,
      });
      return await loginModal.present();
    }
}
