import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';

import { Storage } from '@ionic/storage';
import { Fiche } from '../models/Fiche';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;

  isLoggedIn = false;
  token:any; //Token envoyé de La Backend (Laravel) lors du login
  us: User; //L'utilisateur connecté
  userResult : any;
  nbreFiche: any; //Nbre de fiches remplies par l'utilisateur connecté
  reponsesFiche = new Array(); //Les réponses des fiches remplies par l'utilisateur connecté
  // fiche: Fiche;

  constructor(
    private http: HttpClient,
    // private storage: NativeStorage,
    private storage: Storage,
    private env: EnvService,
  )
  {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  }

  addFiche(test, isolement, situation, symptome, tempsTousse, user_id)
  {
    return this.http.post(this.env.API_URL + `question/${user_id}`,
      {Q1: test, Q2: isolement, Q3: situation, Q4: symptome, Q5: tempsTousse, isTreated : 0, resultat: 'null'})
  }

  addInfos(nom, prenom, age, sexe, adresse, telephone, ville, user_id)
  {
    let data =
    {
      nom: nom, 
        prenom: prenom,
        age: age,
        sexe: sexe,
        adresse: adresse,
        telephone: telephone,
        ville: ville
    }
    return this.http.post(this.env.API_URL + `info/${user_id}`,data);
  }

  userReponse(user_id)
  {
    this.userResult = undefined;

    return this.http.get(this.env.API_URL + `question/${user_id}`)
      .pipe(
      tap(data =>
      {
        this.userResult = data['question'].resultat;
      },
      error => {
        console.log(error);
      })
    )
  }

  
  getUserResult()
  {
    console.log("resultat = " + this.userResult);
    
    return this.userResult;
  }

  getNbreFiche() {
    return this.nbreFiche;
  }
  public get userValue(): User
  {
    return this.userSubject.value;
  }
  getReponsesUser() {
    return this.reponsesFiche;
  }

  login(email: String, password: String)
  {
    return this.http.post(this.env.API_URL + 'auth/mobile/login',
      {email: email, password: password}
    ).pipe(
      tap(data =>
        {
        this.storage.set('token', data['access_token'])
        .then(
          data => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = data['access_token'];
        this.us = data['user'];
        localStorage.setItem('user', JSON.stringify(data['user']));
        this.isLoggedIn = true;
        return data;
      })
    );
  }

  getUser()
  {
    return this.userSubject.value;;
  }

  register(name: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/mobile/register',
      {name: name, email: email, password: password}
    )
  }


  hasQuestion(user_id)
  {
    return this.http.get(this.env.API_URL + `question/verify/${user_id}`);
  }

  hasInfos(user_id)
  {
    return this.http.get(this.env.API_URL + `info/verify/${user_id}`);
  }
  logout()
  {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer` + this.token
    });
    
    return this.http.post(this.env.API_URL + 'auth/mobile/logout',[],{ headers : headers }
    )
    .pipe(
      tap(data => {
        localStorage.removeItem('user');
        this.storage.remove("token");
        this.isLoggedIn = false;
        this.token = undefined; //Token envoyé de La Backend (Laravel) lors du login
        this.us = undefined; //L'utilisateur connecté
        this.userResult = undefined;
        return data;
      })
    )
  }

  getToken() {
    return this.storage.get('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }
}
