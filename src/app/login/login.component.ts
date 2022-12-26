import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../_services/user.service";
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";
import {User} from "../_model/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user:User ={
    userId:0,
    userName:"",
    userPassword:"",
    userRole:[],
    email:"",
      street:"",
      city:"",
      state:"",
      pinCode:""

  }

  constructor(
    private userService : UserService,
    private userAuthService:UserAuthService,
    private router:Router
    ) {
  }
  ngOnInit(): void {

  }
  login(loginForm: NgForm) {

    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response)
        this.userAuthService.setUserId(response.user.userId)
        this.userAuthService.setUserName(response.user.userName)
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        // console.log(this.userAuthService.getUserId())
        // console.log(this.userAuthService.getUserName())
        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  registerUser(){
    this.router.navigate(['/register']);
  }
  }



