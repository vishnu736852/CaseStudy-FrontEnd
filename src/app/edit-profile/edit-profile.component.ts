import {Component, OnInit} from '@angular/core';
import {User} from "../_model/user.model";
import {UserAuthService} from "../_services/user-auth.service";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{
  loggedInUserId : number = this.userAuthService.getUserId();
  user : User ={
    userId :this.loggedInUserId,
    userName:"",
    userPassword:"",
    userRole:"",
    email:"",
    street:"",
    state:"",
    city:"",
    pinCode:""
  }
  updatedUser : User ={
    userId :this.loggedInUserId,
    userName:"",
    userPassword:"",
    userRole:"",
    email:"",
    street:"",
    state:"",
    city:"",
    pinCode:""
  }

  constructor(private userAuthService : UserAuthService,private userService:UserService,private router:Router) {
  }
  ngOnInit() {
    this.getUserById();
  }

  getUserById(){
    this.userService.getUserById(this.loggedInUserId).subscribe(
      (resp)=>{
        this.user=resp;
    },error => {
        console.log(error);
      }
    )
  }

  updateUserDetails(updateForm:NgForm){
    this.userService.updateUserProfile(updateForm).subscribe(
      (resp)=>{
        this.updatedUser=resp ;
        console.log(this.updatedUser)
        alert("user details updated")
      },error => {
        console.log(error)
        alert("user details not updated")
      }
    )
  }
}
