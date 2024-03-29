import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { JsonService } from 'src/app/Services/json.service';
import { RegisterUser } from "../../CustomClaases/register.class"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //Initializing the form variables
  fullName: string = "";
  email: string = "";
  password: string = "";
  cPassword: string = "";


  //Checking for already logged in user
  constructor(public router: Router, private jsonservice: JsonService) {

  }
  checkAuth: string | null = window.localStorage.getItem('user');
  if(checkAuth: string) {
    this.router.navigate(['book']);
  }



  //Registering user using data form form
  //If you are using object of differebt class then decare the object outside function not inside the function
  newUser!: RegisterUser;
  userjson!:any;

  // Validation
  validRegex: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  registerUser(registerData: any): void {

    //Email Validation
    if (!this.validRegex.test(registerData.email)) {
      alert("Enter valid email.");
      this.email = "";
      return;
    }

    // check name validation.
    if (this.fullName.trim() === "") {
      alert("Name can't be empty.");
      return;
    }

    //Password Validation
    if (this.password.length < 6) {
      alert("Password must contain atleast 6 characters.");
      this.password = "";
      return;
    } else if (this.password.includes(" ")) {
      alert("Password shouldn't contain any space.");
      this.password = "";
      return;
    }

    // confirm password check validation.
    if (this.cPassword.length < 6) {
      alert("Confrim Password must contain atleast 6 characters.");
      return;
    } else if (this.cPassword.includes(" ")) {
      alert("Confirm Password shouldn't contain any space.");
      return;
    } else if (this.password !== this.cPassword) {
      alert("Password and confrim password didn't matched.");
      return;
    }

    this.newUser = new RegisterUser(registerData.fullName, registerData.email, registerData.password, registerData.cPassword);
    console.log(this.newUser);    
    this.userjson = JSON.stringify(this.newUser);
    console.log(this.userjson);
    

    this.jsonservice.storeData(this.newUser).subscribe(response => {
      alert('User Registration successfull:');
      window.location.pathname = "login";
      console.log(response);      
    }, error => {
      alert('Error In registering user: ');
      console.log(error);
    });
  }
}
