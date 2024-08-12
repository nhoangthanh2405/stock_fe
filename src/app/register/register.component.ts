import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { PasswordToggleService } from '../_services/passwordToggleService';
import { LoginComponent } from '../login/login.component';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    fullName: null,
    username: null,
    email: null,
    password: null,
    verify_code: null
  };
  isFormValid = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isSentMail = false;


  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private passwordToggleService: PasswordToggleService,
    private router: Router,
    private appComponent: AppComponent
  ) { }


  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const { fullName, username, email, password } = this.form;
    this.isSentMail = true;
    this.authService.sendCode(email).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });

  }



  togglePasswordVisibility(): void {
    this.passwordToggleService.togglePasswordVisibility('password', 'toggle-password');
  }

  checkFormValidity() {
    const password = this.form.password;
    const username = this.form.username;
    const fullName = this.form.fullName;
    this.isFormValid = password && password.length >= 6 && username && username.length >= 5 && fullName && fullName.length >= 3;
  }
  checkFormValidityPassWord() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = 'password';
    this.checkFormValidity();
  }



  checkCodeSignup(verify_code: string): void {
    const { fullName, username, email, password } = this.form;

    this.authService.register(fullName, username, email, password, verify_code).subscribe({
      next: data => {
        if (data.success) {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          // Dừng 1 giây.
          setTimeout(() => {
            this.authService.login(username, password).subscribe({
              next: loginData => {
                this.storageService.saveUser(loginData);
                this.router.navigate(['/home']);
                // Nếu bạn cần làm gì đó khi người dùng đã đăng nhập thành công, bạn có thể gọi ngOnInit() tại đây.
                this.appComponent.ngOnInit();
              },
              error: loginError => {
                this.errorMessage = loginError.error.message;
              }
            });
          }, 1000); // 1000 milliseconds = 1 second
        } else {
          this.isSuccessful = false;
          this.isSignUpFailed = true;
          this.errorMessage = data.error ? data.error.message : 'Unknown error occurred.';
        }
      },
      error: err => {
        this.isSuccessful = false;
        this.isSignUpFailed = true;
        this.errorMessage = err.error.message;
      }
    });
  }
}
