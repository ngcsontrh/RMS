import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DonViChuTriData, PageData } from '../models/data';
import { DonViChuTriSearch } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class DonViChuTriService {
  private endpoint = '/api/don-vi-chu-tri';

  constructor(private http: HttpClient) {}

  getDonViChuTris(search: DonViChuTriSearch): Observable<PageData<DonViChuTriData>> {
    let params = new HttpParams();
    Object.keys(search).forEach(key => {
      if (search[key] !== null && search[key] !== undefined) {
        params = params.set(key, search[key]);
      }
    });

    return this.http.get<PageData<DonViChuTriData>>(this.endpoint, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getDonViChuTri(id: number): Observable<DonViChuTriData> {
    return this.http.get<DonViChuTriData>(`${this.endpoint}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createDonViChuTri(data: DonViChuTriData): Observable<void> {
    return this.http.post<void>(this.endpoint, data).pipe(
      catchError(this.handleError)
    );
  }

  editDonViChuTri(id: number, data: DonViChuTriData): Observable<void> {
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
