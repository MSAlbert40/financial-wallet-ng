import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginInvalid = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.maxLength(200)]]
    })
  }

  ngOnInit(): void { }

  logIn(): void {
    this.loginInvalid = false
    if ((this.loginForm.value.username != '' && this.loginForm.value.password != '')) {
      console.log('Successful');
      this.authService.logIn(this.loginForm.getRawValue()).subscribe({
        error: (err) => {
          console.log(err);
          this.loginInvalid = true;
        },
        next: (res) => {
          this.authService.loginUser(res.data.token, res.data.id, res.data.name);
          window.location.href = '/Enterprise';
        },
        complete: () => {
          console.log('complete');
          console.log('token:', this.authService.getToken());
          console.log('id:', this.authService.getUser());
        },
      });
    } else {
      console.log('Complete Form');
    }
  }
}
