import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {User} from "../_model/user.model";
import {SignUpUser} from "../_model/signUpUser.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private userService: UserService,private router:Router) {
  }
  ngOnInit() {
  }

  register(registerForm:NgForm ){
    let newUser:SignUpUser ={
      userName:registerForm.value.userName,
      userPassword:registerForm.value.userPassword,
      userRole:registerForm.value.userRole,
      email:registerForm.value.email,
        street:registerForm.value.street,
        city:registerForm.value.city,
        state:registerForm.value.state,
        pinCode:registerForm.value.pinCode
    }
    console.log(newUser)

    this.userService.register(registerForm.value).subscribe(
      (resp)=>{
        alert("new user created")
        },error => {
        console.log(error)
      }
    )
  }
}
