import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonService } from 'src/app/Services/json.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //Checking for already logged in user
  constructor(public router: Router, private jsonservice: JsonService,private http: HttpClient) {

  }
  checkAuth: string | null = window.localStorage.getItem('user');
  if(checkAuth: string) {
    this.router.navigate(['book']);
  }

  //Initializing the form variables
  email: string = "";
  password: string = "";


  // Validation
  validRegex: RegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginUser(loginData: any): void 
  {
    //Email Validation
    if (!this.validRegex.test(this.email)) {
      alert("Enter valid email.");
      this.email = "";
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
    this.logUser(loginData.email, loginData.password);
  }
  user!:String;
    logUser(email: string, password: string): void {
      this.http.get<any>('http://localhost:3000/users').subscribe(data => {
        console.log(data);
        console.log(email, password);                
        this.user = data.filter((userData:any) => {
          return userData.Email === email && userData.Password === password;
        });
        console.log(this.user);        
        const userLength = this.user.length;
        if (userLength === 0) {
          alert("Enter valid credentials.");
          return;
        }
        localStorage.setItem("user", JSON.stringify(this.user[0]));
        console.log(JSON.stringify(this.user[0]));
        alert("Login Successful.");
        // Redirect to books page
        window.location.pathname = "home";
      });
}
}
