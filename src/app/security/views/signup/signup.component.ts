import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  registerInvalid = false;
  hide = true;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.maxLength(200)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      dni: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.required, Validators.maxLength(12)]]
    });
  }

  ngOnInit(): void { }

  signUp(): void {
    this.authService.signUp(this.registerForm.getRawValue()).subscribe({
      error: (err) => {
        console.log(err);
        this.registerInvalid = true;
      },
      next: (res) => {
        console.log(res);
        console.log(this.registerForm.getRawValue());
        window.location.href = '/LogIn';
      },
      complete: () => console.log('Complete')
    });
  }
}
