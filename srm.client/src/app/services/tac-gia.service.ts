import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TacGiaData, PageData } from '../models/data';
import { TacGiaSearch } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class TacGiaService {
  private endpoint = '/api/tac-gia';

  constructor(private http: HttpClient) {}

  getTacGias(search: TacGiaSearch): Observable<PageData<TacGiaData>> {
    let params = new HttpParams();
    Object.keys(search).forEach(key => {
      if (search[key] !== null && search[key] !== undefined) {
        params = params.set(key, search[key]);
      }
    });

    return this.http.get<PageData<TacGiaData>>(this.endpoint, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getTacGiaDropDownData(): Observable<TacGiaData[]> {
    return this.http.get<TacGiaData[]>(`${this.endpoint}/dropdown-data`).pipe(
      catchError(this.handleError)
    );
  }

  getTacGia(id: number): Observable<TacGiaData> {
    return this.http.get<TacGiaData>(`${this.endpoint}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createTacGia(data: TacGiaData): Observable<void> {
    return this.http.post<void>(this.endpoint, data).pipe(
      catchError(this.handleError)
    );
  }

  editTacGia(id: number, data: TacGiaData): Observable<void> {
    return this.http.put<void>(`${this.endpoint}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Xảy ra lỗi trong quá trình xử lý';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 404) {
        errorMessage = 'Không tìm thấy dữ liệu';
      } else if (error.status === 400) {
        errorMessage = error.error.join('\n');
      }
    }
    return throwError(errorMessage);
  }
}
