import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartIndicator } from '../model/ChartIndicator';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ChartIndicatorService {
  //PROD
  // private apiUrl = 'https://stockbe-production.up.railway.app/api/chart-indicator'; // Địa chỉ backend của bạn

  //DEV
  private apiUrl = 'http://localhost:8080/api/chart-indicator'; // Địa chỉ backend của bạn

  constructor(private http: HttpClient) { }

  createChartIndicator(chartIndicator: ChartIndicator): Observable<any> {
    return this.http.post(
      this.apiUrl,
      chartIndicator, // Gửi stock trực tiếp mà không bao bọc trong object
      httpOptions
    );
  }

  getChartIndicator(pageNum: number, pageSize: number):Observable<any> {
    return this.http.get(`${ this.apiUrl}/search?pageNum=${pageNum}&pageSize=${pageSize}`);
  }


}
