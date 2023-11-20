import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleApiService {

  private pathService = '/api/article';

  constructor(private httpClient: HttpClient) {
  }

  public all(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.pathService}/user-feed`);
  }

  public detail(id: number): Observable<Article> {
    return this.httpClient.get<Article>(`${this.pathService}/detail/${id}`);
  }

  public create(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(`${this.pathService}/add`, article);
  }

}