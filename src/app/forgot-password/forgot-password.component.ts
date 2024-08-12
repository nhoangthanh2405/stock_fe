import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Form, NgForm } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { PasswordToggleService } from '../_services/passwordToggleService';
import { EmailValidatorService } from '../_services/email.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  form: any = {
    verify_code: null,
    email: null,
    password: null,
    confirmPassword: null,
    };

  isFormValid = false;
  isVerifyCode = false;
  isSentMail = false;
  isVerifyCodeFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private storageService: StorageService, 
    private router: Router,
    private passwordToggleService: PasswordToggleService,
    private emailValidator: EmailValidatorService
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
    this.form = {
      verify_code: null,
      email: null
    };
  }

  onSubmit(): void {
    const { verify_code, email} = this.form;
    if (verify_code == null) {
      this.authService.sendCode(email).subscribe({
        next: data => {
          console.log(data);
          this.isSentMail = true;
          this.isVerifyCode = true;
          this.isVerifyCodeFailed = false;
        },
        error: err => {
          this.isSentMail = false;
          this.errorMessage = err.error.message;
          this.isVerifyCodeFailed = true;
        }
      });
    }
  }
  

forgotPassword(verify_code: string, email: string, password: string, f: NgForm): void {
  const confirmPassword = this.form.confirmPassword;
  if(!(password && password.length >= 6 && confirmPassword && confirmPassword.length >= 6 && email && email.length >= 10)){
    return;
  }
  console.log(verify_code);
  console.log(email);
  console.log(password);
  this.authService.forgotPassword(verify_code, email, password).subscribe({
    next: data => {
      console.log(data);
      this.isVerifyCode = true;
      this.isVerifyCodeFailed = false;
    },
    error: err => {
      this.isSentMail = false;
      this.errorMessage = err.error.message;
      this.isVerifyCodeFailed = true;
    }
  });
}
  
checkFormValidity() {
  const password = this.form.password;
  const confirmPassword = this.form.confirmPassword;
  const email = this.form.email;
  this.isFormValid = password && password.length >= 6 && confirmPassword && confirmPassword.length >= 6 && email && email.length >= 10
  && confirmPassword === password && this.emailValidator.isValidEmail(email);
}

togglePasswordVisibility(id: string, togglePassword: string): void {
  this.passwordToggleService.togglePasswordVisibility(id, togglePassword);
}

}
