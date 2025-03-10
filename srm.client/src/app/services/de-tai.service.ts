import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DeTaiData, PageData } from '../models/data';
import { DeTaiSearch } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class DeTaiService {
  private endpoint = '/api/de-tai';

  constructor(private http: HttpClient) {}

  getDeTais(search: DeTaiSearch): Observable<PageData<DeTaiData>> {
    let params = new HttpParams();
    Object.keys(search).forEach(key => {
      if (search[key] !== null && search[key] !== undefined) {
        params = params.set(key, search[key]);
      }
    });

    return this.http.get<PageData<DeTaiData>>(this.endpoint, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getDeTai(id: number): Observable<DeTaiData> {
    return this.http.get<DeTaiData>(`${this.endpoint}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createDeTai(data: DeTaiData): Observable<void> {
    return this.http.post<void>(this.endpoint, data).pipe(
      catchError(this.handleError)
    );
  }

  editDeTai(id: number, data: DeTaiData): Observable<void> {
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
