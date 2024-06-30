import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

const httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable()

export class HttpService {
  private basURL: string = "http://localhost:3000";
  private timeout: number = 300000;

  constructor(private httpClient: HttpClient) { }

  public getAll(url: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.basURL + url, { headers: httpHeaders })
      .pipe(catchError(this.handleError), timeout(this.timeout));
  }

  public create(url: string, resources: any): Observable<any> {
    return this.httpClient.post<any>(this.basURL + url, resources, { headers: httpHeaders })
      .pipe(catchError(this.handleError), timeout(this.timeout));
  }

  public update(url: string, id: string, resources: any): Observable<any> {
    return this.httpClient.put<any>(this.basURL + url + '/' + id, resources, { headers: httpHeaders })
      .pipe(catchError(this.handleError), timeout(this.timeout));
  }

  public getById(url: string, id: string): Observable<any> {
    return this.httpClient.get<any>(this.basURL + url + '/' + id, { headers: httpHeaders })
      .pipe(catchError(this.handleError), timeout(this.timeout));
  }

  public delete(url: string, id: string): Observable<any> {
    return this.httpClient.delete<any>(this.basURL + url + '/' + id, { headers: httpHeaders })
      .pipe(catchError(this.handleError), timeout(this.timeout));
  }

  /**
   * Handles http error response.
   * @param error The http error response.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
