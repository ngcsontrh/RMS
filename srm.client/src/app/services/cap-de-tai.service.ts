import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CapDeTaiData, PageData } from '../models/data';
import { CapDeTaiSearch } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class CapDeTaiService {
  private endpoint = '/api/cap-de-tai';

  constructor(private http: HttpClient) {}

  getCapDeTais(search: CapDeTaiSearch): Observable<PageData<CapDeTaiData>> {
    let params = new HttpParams();
    Object.keys(search).forEach(key => {
      if (search[key] !== null && search[key] !== undefined) {
        params = params.set(key, search[key]);
      }
    });

    return this.http.get<PageData<CapDeTaiData>>(this.endpoint, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getCapDeTai(id: number): Observable<CapDeTaiData> {
    return this.http.get<CapDeTaiData>(`${this.endpoint}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createCapDeTai(data: CapDeTaiData): Observable<void> {
    return this.http.post<void>(this.endpoint, data).pipe(
      catchError(this.handleError)
    );
  }

  editCapDeTai(id: number, data: CapDeTaiData): Observable<void> {
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
