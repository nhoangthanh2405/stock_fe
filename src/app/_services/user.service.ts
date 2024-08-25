import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://stockbe-production.up.railway.app/api/test/';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getmacophieu(): Observable<any> {
    const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDEyNzE1NTkyLCJuYmYiOjE3MTI3MTU1OTIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIwNGVjZDAzNS00NDgzLTQ4MDUtODU1ZS0wYjAzODc4MzFiODYiLCJhdXRoX3RpbWUiOjE3MTI3MTU1OTIsImlkcCI6Ikdvb2dsZSIsIm5hbWUiOiJuZ3V5ZW5ob2FuZ3RoYW5oMjQwNUBnbWFpbC5jb20iLCJzZWN1cml0eV9zdGFtcCI6ImExOGE0MWY5LTM2YTQtNDAwMi04Nzc3LTk1ODEyYmE0NjJlYSIsImp0aSI6Ijg3YWExMjVlYThiOTlmNDIxY2MwZTlmZTM1MWM4ZjdkIiwiYW1yIjpbImV4dGVybmFsIl19.Qq-iJhub2tRY25UrmRaTVJEFaLbxDUp_DdbHcaOCC6x04CXWoKQR15nM7CdI_R72_MewI8wSOwHlRCeDAkFOnDTTGBUjPD450E_3_rDY7GgLYwNiv8dsH6u-X8ygWTWx5DEIi-KexPgdDNG8dF85QQtaYI8go5WU_zViw53WlB_KRkQoDWcIUwAj4L9VytT-z5vt8BZOpECkNXrc3dKlILP_DRw9g1OS4_E4iqM_1LYbW4Y8KL_BH5iiHB_hu7XuMdxOgzABiP3D5DOXTU4GoqGDJKVoDbe0dRt_drwqQg-hq88t-ogk0jC3WpFD-Ih4UG8DAExmQhrfPjMvBzcoDA'
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<any>('https://restv2.fireant.vn/symbols/FPT/fundamental', { headers });
  }

  getmacophieu123(): Observable<any> {
    const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoyMDEyNzE1NTkyLCJuYmYiOjE3MTI3MTU1OTIsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIiwiZW1haWwiLCJhY2NvdW50cy1yZWFkIiwiYWNjb3VudHMtd3JpdGUiLCJvcmRlcnMtcmVhZCIsIm9yZGVycy13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImZpbmFuY2UtcmVhZCIsInBvc3RzLXdyaXRlIiwicG9zdHMtcmVhZCIsInN5bWJvbHMtcmVhZCIsInVzZXItZGF0YS1yZWFkIiwidXNlci1kYXRhLXdyaXRlIiwidXNlcnMtcmVhZCIsInNlYXJjaCIsImFjYWRlbXktcmVhZCIsImFjYWRlbXktd3JpdGUiLCJibG9nLXJlYWQiLCJpbnZlc3RvcGVkaWEtcmVhZCJdLCJzdWIiOiIwNGVjZDAzNS00NDgzLTQ4MDUtODU1ZS0wYjAzODc4MzFiODYiLCJhdXRoX3RpbWUiOjE3MTI3MTU1OTIsImlkcCI6Ikdvb2dsZSIsIm5hbWUiOiJuZ3V5ZW5ob2FuZ3RoYW5oMjQwNUBnbWFpbC5jb20iLCJzZWN1cml0eV9zdGFtcCI6ImExOGE0MWY5LTM2YTQtNDAwMi04Nzc3LTk1ODEyYmE0NjJlYSIsImp0aSI6Ijg3YWExMjVlYThiOTlmNDIxY2MwZTlmZTM1MWM4ZjdkIiwiYW1yIjpbImV4dGVybmFsIl19.Qq-iJhub2tRY25UrmRaTVJEFaLbxDUp_DdbHcaOCC6x04CXWoKQR15nM7CdI_R72_MewI8wSOwHlRCeDAkFOnDTTGBUjPD450E_3_rDY7GgLYwNiv8dsH6u-X8ygWTWx5DEIi-KexPgdDNG8dF85QQtaYI8go5WU_zViw53WlB_KRkQoDWcIUwAj4L9VytT-z5vt8BZOpECkNXrc3dKlILP_DRw9g1OS4_E4iqM_1LYbW4Y8KL_BH5iiHB_hu7XuMdxOgzABiP3D5DOXTU4GoqGDJKVoDbe0dRt_drwqQg-hq88t-ogk0jC3WpFD-Ih4UG8DAExmQhrfPjMvBzcoDA'
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<any>('https://restv2.fireant.vn/symbols/FPT/timescale-marks?startDate=2023-05-05&endDate=2037-01-01', { headers });
  }
}
