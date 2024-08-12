import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { PasswordToggleService } from '../_services/passwordToggleService';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isFormValid = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService,
    private passwordToggleService: PasswordToggleService,
    private router: Router,
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        if (data.success) {
          this.storageService.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.router.navigate(['/home']);
          // Nếu bạn cần làm gì đó khi người dùng đã đăng nhập thành công, bạn có thể gọi ngOnInit() tại đây.
          this.appComponent.ngOnInit();
        }else{
          this.isLoginFailed = true;
          this.errorMessage = data.error ? data.error.message : 'Unknown error occurred.';
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  togglePasswordVisibility(): void {
    this.passwordToggleService.togglePasswordVisibility('password', 'toggle-password');
  }

  
  checkFormValidity() {
    const password = this.form.password;
    const username = this.form.username;
    this.isFormValid = password && password.length >= 6 && username && username.length >= 5;
  }

}
