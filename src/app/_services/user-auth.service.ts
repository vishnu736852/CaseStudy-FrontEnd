import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public setRoles(roles:[]){
    localStorage.setItem("roles",JSON.stringify(roles));
  }
  public getRoles(): any[] {
    const roles = localStorage.getItem("roles");
    if (roles) {
      return JSON.parse(roles);
    } else {
      return [];
    }
  }


  public setToken(jwtToken:string){
    localStorage.setItem('jwtToken',jwtToken);
  }
  public getToken(){
    return localStorage.getItem('jwtToken');
  }
  public setUserId(userId:number){
    localStorage.setItem('userId',JSON.stringify(userId))
  }
  public getUserId(){
   const userId= localStorage.getItem('userId')
    if (userId) {
      return JSON.parse(userId);
    } else {
      return [];
    }
  }
  public setUserName(userName:string){
    localStorage.setItem('userName',userName)
  }
  public getUserName(){
    let userName= localStorage.getItem('userName')
    if (userName) {
      return (userName);
    } else {
      return ["hi"];
    }
  }
  public clear(){
    localStorage.clear();
  }
  public isLoggedIn(){
    return this.getRoles() && this.getToken();
  }
  public isAdmin(){
    const roles: any[] = this.getRoles();
      return roles[0].roleName === 'Admin';
    }
  public isUser(){
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }


}
