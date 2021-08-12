import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.api;
  token: string = " ";
  userId: string = "";

  isAuth$ = new BehaviorSubject<boolean>(false);//observable bouléen qui peut avoir une valeur par défaut

  constructor(private http: HttpClient) {
    this.token="";
    this.userId="";

   }

   //création de compte
  signup(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.http.post(this.api+'/users/signup', {email: email, password: password}).subscribe(
          (signUpData:any| {status:number, message: string})=>{
            //authentifier l'utilisateur
            if(signUpData.status === 201){
              this.signin(email, password)
              .then(()=>{resolve(true);})
              .catch((err)=>{reject(err)})
            }else{
              reject(signUpData.message);
            }

          },
          (err)=>{
            reject(err.message)
          }
        )
        })
  }

  //authentification utilisateur
  signin(email: string, password: string){
    return new Promise((resolve, reject)=>{
      this.http.post(this.api+'/users/login', {email: email, password: password}).subscribe(
        (authData: any| {token: string, userId: string})=>{
        this.token = authData.token;
          this.userId = authData.userId;
          this.isAuth$.next(true);
          console.log(authData);
          resolve(true);
        },
        (err)=>{
          reject(err.message)
        }
      )
    })
  }

  logout(){
    this.isAuth$.next(false);
    this.userId = "";
    this.token = "";
  }

}
