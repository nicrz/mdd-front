import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeApiService {

  private pathService = '/api/theme';

  constructor(private httpClient: HttpClient) {
  }

  public all(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.pathService}/list`);
  }

  public subscribe(id: number, userId: number): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/${id}/subscribe/${userId}`, null);
  }

  public unSubscribe(id: number, userId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.pathService}/${id}/subscribe/${userId}`);
  }

}