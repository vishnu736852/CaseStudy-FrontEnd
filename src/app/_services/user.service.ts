import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";
import {Observable} from "rxjs";
import {User} from "../_model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API ="http://localhost:9090";
  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );
  constructor(private httpclient :HttpClient , private userAuthService:UserAuthService) { }

  public login(loginData: any){
    return this.httpclient.post(this.PATH_OF_API + "/authenticate" ,loginData ,{headers: this.requestHeader});
  }

  public register(registerData:any){
    return this.httpclient.post(this.PATH_OF_API + "/signup",registerData);
  }

  public getUserById(userId:number):Observable<User>{
    return this.httpclient.get<User>(this.PATH_OF_API + "/getprofile/" + userId);
  }

  public updateUserProfile(userData : any):Observable<User>{
    return this.httpclient.post<User>(this.PATH_OF_API + "/updateProfile/" ,userData )
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }
  public roleMatch(allowedRoles:any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }

}
