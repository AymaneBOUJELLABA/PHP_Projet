import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { InfosUser } from 'src/app/models/InfosUser';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.page.html',
  styleUrls: ['./infos.page.scss'],
})
export class InfosPage implements OnInit {

  user: User;
  user_id : number;
  userInfos = new InfosUser();

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { 
      this.userInfos.nom = "";
      this.userInfos.prenom = "";
      this.userInfos.age = 0;
      this.userInfos.sexe = "";
      this.userInfos.adresse = "";
      this.userInfos.telephone = "";
      this.userInfos.ville = "";

      this.user_id = this.authService.getUser().id;
  }

  sexe(value)
  {
    this.userInfos.sexe = value.detail.value.toString();
  }
  ville(value)
  {
    this.userInfos.ville = value.detail.value.toString();
  }

  infos(form: NgForm)
  {
    console.log(form)
    this.authService.addInfos(form.value.nom, form.value.prenom, form.value.age, this.userInfos.sexe, form.value.adresse, form.value.telephone, this.userInfos.ville, this.user_id).subscribe(
      data => {
        this.alertService.presentToast("Vos informations sont bien enregistrées !");
        console.log(data);
        
      },
      error => {
        console.log(error);
      },
    )
      this.navCtrl.navigateRoot('/dashboard');
  }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

}
