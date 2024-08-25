import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(full_name: string, username: string, email: string, password: string, verify_code: string): Observable<any> {
    console.log("SINGUP ");
    
    return this.http.post(
      AUTH_API + 'signup',
      { 
        full_name,
        username,
        email,
        password,
        verify_code
      },
      httpOptions
    );
  }
  
  sendCode(email: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'send-code',
      {
        email
      },
      httpOptions
    );
  }
  
  forgotPassword(code: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'forgot-password',
      {
        code,
        email,
        password
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    const user = this.storageService.getUser();
    const id = user.data.id;
    const email = user.data.email;
    const username = user.data.username;
    return this.http.post(
      AUTH_API + 'signout',
      { 
        id,
        username,
        email
      },
      httpOptions
    );
  }

    // Hàm kiểm tra địa chỉ email
    getUserId(): number {
      const user = this.storageService.getUser();
      return user.data.id;
    }
}
