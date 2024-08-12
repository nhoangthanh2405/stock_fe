import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockSelection } from '../model/stock-selection';
import { Stock } from '../model/stock';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiStockUrl = 'http://localhost:8080/api/stock'; // Địa chỉ backend của bạn
  private apiUrl = 'http://localhost:8080/api'; // Địa chỉ backend của bạn

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.apiUrl}/upload-file`, formData);
  }

  getImage(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/files/${fileName}`, { responseType: 'blob' });
  }
  createStock(stock: Stock): Observable<any> {
    return this.http.post(
      this.apiStockUrl,
      stock, // Gửi stock trực tiếp mà không bao bọc trong object
      httpOptions
    );
  }
  deleteItem(stock_id: number):Observable<any> {
    return this.http.delete(`${ this.apiStockUrl}/${stock_id}`);
  }
  getStocksByUserId(userId: number):Observable<any> {
    return this.http.get(`${ this.apiStockUrl}/user/${userId}`);
  }
}
