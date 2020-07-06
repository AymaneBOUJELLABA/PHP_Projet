import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  user: User;
  resultat : any;

  constructor(private authService: AuthService)
  {
    
  }

  userReponse()
  {
    this.authService.userReponse(this.user.id).subscribe(
      data => {
        console.log(data['question'].resultat);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit()
  {
    this.user = this.authService.getUser();
    this.userReponse();
    
  }


  showResult()
  {
    this.resultat = this.authService.getUserResult();
    console.log(this.resultat);
    
  }

}
