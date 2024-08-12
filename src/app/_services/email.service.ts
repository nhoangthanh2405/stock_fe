import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailValidatorService {
  // Biểu thức chính quy để kiểm tra địa chỉ email
  private emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor() {}

  // Hàm kiểm tra địa chỉ email
  isValidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }
}
