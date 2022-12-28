import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
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
  registerForm !: FormGroup;
  submitted =false ;
  constructor(private userService: UserService,private router:Router,private fb : FormBuilder) {
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      userName:['',Validators.required],
      email:['',Validators.required,Validators.email],
      userPassword:['',Validators.required,Validators.minLength(5)],
      street:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pinCode:['',Validators.required]
    })
  }
  //
  // register(registerForm:NgForm ){
  //   let newUser:SignUpUser ={
  //     userName:registerForm.value.userName,
  //     userPassword:registerForm.value.userPassword,
  //     userRole:registerForm.value.userRole,
  //     email:registerForm.value.email,
  //       street:registerForm.value.street,
  //       city:registerForm.value.city,
  //       state:registerForm.value.state,
  //       pinCode:registerForm.value.pinCode
  //   }
  //   console.log(newUser)
  //
  //   this.userService.register(registerForm.value).subscribe(
  //     (resp)=>{
  //       alert("new user created")
  //       },error => {
  //       console.log(error)
  //     }
  //   )
  // }

  register() {
    this.submitted = true;
    let newUser: SignUpUser = {
      userName: this.registerForm.value.userName,
      userPassword: this.registerForm.value.userPassword,
      userRole: this.registerForm.value.userRole,
      email: this.registerForm.value.email,
      street: this.registerForm.value.street,
      city: this.registerForm.value.city,
      state: this.registerForm.value.state,
      pinCode: this.registerForm.value.pinCode
    }
    console.log(newUser)
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(
        (resp) => {
          alert("new user created")
          window.location.href = './login'
        }, error => {
          alert("fields missing")
        }
      )
    }
  }

}
