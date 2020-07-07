import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Fiche } from 'src/app/models/Fiche';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fiche',
  templateUrl: './fiche.page.html',
  styleUrls: ['./fiche.page.scss'],
})
export class FichePage implements OnInit {

  tousse: any;
  fiche = new Fiche();
  user : User;
  hasQuestion = '';
  constructor(
    // private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { 
      this.fiche.test = "";
      this.fiche.isolement = "";
      this.fiche.situation = "";
      this.fiche.symptome = "";
      this.fiche.tempsTousse = 0;
      this.user = this.authService.userValue;

  }

  ngOnInit()
  {
    this.UserhasQuestion();
  }
  UserhasQuestion()
  {
    let bool:boolean;
    this.authService.hasQuestion(this.user.id).subscribe(
      data => {
        console.log(data);
        this.hasQuestion = data['hasQuestion'];
        if(this.hasQuestion == 'true')
        {
          this.alertService.presentToast("Vous avez dèja envoyé votre demande");
          this.navCtrl.navigateRoot('/result');
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  test(value) {
    this.fiche.test = value.detail.value.toString();
  }
  isolement(value)
  {
    this.fiche.isolement = value.detail.value.toString();
  }
  situation(value)
  {
    this.fiche.situation = this.fiche.situation.concat(value.detail.value.toString());
    this.fiche.situation = this.fiche.situation.concat(" - ".toString());
  }
  symptome(value)
  {
    this.fiche.symptome = this.fiche.symptome.concat(value.detail.value.toString());
    this.fiche.symptome = this.fiche.symptome.concat(" - ".toString());
  }

  addFiche() 
  {
    // fiche = this.fiche;
    this.fiche.tempsTousse = this.tousse;
    this.authService.addFiche(this.fiche.test, this.fiche.isolement, this.fiche.situation, this.fiche.symptome, this.fiche.tempsTousse, this.user.id).subscribe(
      data => {
        this.alertService.presentToast("Vos reponses sont bien envoyées !");
      },
      error => {
        console.log(error);
      },  
    )

      this.navCtrl.navigateRoot('/dashboard');
  }

}
