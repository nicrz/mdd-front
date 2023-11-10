import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import { Article } from '../../interfaces/article.interface';
import { ArticleApiService } from '../../services/article-api.service';

@Component({
  selector: 'article-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public article: Article | undefined;

  public articleId: number;
  public userId: number;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private articleApiService: ArticleApiService,
    private router: Router) {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = this.sessionService.sessionInformation!.id;
  }

  public ngOnInit(): void {
    this.fetchSession();
  }

  public back() {
    window.history.back();
  }

  private fetchSession(): void {
    this.articleApiService
      .detail(this.articleId)
      .subscribe((article: Article) => {
        this.article = article;
      });
  }

}