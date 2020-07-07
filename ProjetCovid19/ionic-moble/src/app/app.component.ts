import { Component } from '@angular/core';

import { Platform, NavController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { AlertService } from './services/alert.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  //styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: 'home'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private modalController: ModalController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // this.menu.enable(true, 'main');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      // this.splashScreen.hide();
      //this.splashScreen.hide();
      this.authService.getToken();
    });
  }

  // When Logout Button is pressed 
  logout() {
    this.authService.logout().subscribe(
      data => {
        this.alertService.presentToast('Vous etes déconnecté');     
        this.navCtrl.navigateRoot('/landing');   
        this.modalController.dismiss();
      },
      error => {
        console.log(error);
      },
    );
  }

}
