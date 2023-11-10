import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import { ThemeService } from '../../../../services/theme.service';
import { Article } from '../../interfaces/article.interface';
import { Theme } from '../../../themes/interfaces/theme.interface';
import { ArticleApiService } from '../../services/article-api.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class ArticleFormComponent implements OnInit {

  public articleForm: FormGroup | undefined;
  public themes: Theme[] = [];
  private id: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private articleApiService: ArticleApiService,
    private sessionService: SessionService,
    private themeService: ThemeService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.loadThemes();
    this.initForm();
  }

  public submit(): void {
    const article = this.articleForm?.value as Article;

    this.articleApiService
        .create(article)
        .subscribe((_: Article) => this.exitPage('Post created !'));
  }

private initForm(): void {
  this.articleForm = this.fb.group({
    title: ['', [Validators.required]],
    theme_id: ['', [Validators.required]],
    content: ['', [Validators.required, Validators.maxLength(2000)]]
  });
}

  private exitPage(message: string): void {
    this.router.navigate(['articles']);
  }

  private loadThemes(): void {
    this.themeService.all().subscribe((data: any) => {
      this.themes = data.themes; // Assigne les thèmes déballés à la propriété
      console.log(this.themes);
    });
  }
}