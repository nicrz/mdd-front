import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import { Article } from '../../interfaces/article.interface';
import { ArticleApiService } from '../../services/article-api.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ArticlesListComponent implements OnInit { 

  public articles: Article[] = [];
  public user: User | undefined;
  public hasSubscribe: boolean = false;
  public selectedThemeId: number | undefined;

  constructor(
    private sessionService: SessionService,
    private articleApiService: ArticleApiService
  ) { }

  ngOnInit() {
    this.loadArticles(); // Charge les articles lors du chargement initial de la page

    // Récupére l'utilisateur connecté depuis le service Session
    this.sessionService.$isLogged().subscribe((isLogged) => {
      this.user = this.sessionService.sessionInformation;
      if (isLogged) {
        this.loadArticles(); // Recharge les articles si l'utilisateur s'est connecté
      }
    });
  }

  // Charge les thèmes depuis le service
  private loadArticles(): void {
    this.articleApiService.all().subscribe((data: any) => {
      console.log(data); // Vérifie les données renvoyées par le service
      this.articles = data.articles; // Assigne les thèmes déballés à la propriété
    });
  }


}