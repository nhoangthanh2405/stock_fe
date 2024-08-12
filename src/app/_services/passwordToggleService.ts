import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordToggleService {
  constructor() { }

  togglePasswordVisibility(passwordInputId: string, toggleIconClass: string): void {
    const passwordInput = document.getElementById(passwordInputId) as HTMLInputElement;
    const togglePassword = document.querySelector(`.${toggleIconClass}`) as HTMLElement;

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}
