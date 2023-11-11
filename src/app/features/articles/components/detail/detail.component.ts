import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import { Article } from '../../interfaces/article.interface';
import { Comment } from '../../interfaces/comment.interface';
import { ArticleApiService } from '../../services/article-api.service';
import { CommentApiService } from '../../services/comment-api.service';

@Component({
  selector: 'article-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public article: Article | undefined;
  public comments: Comment[] = [];
  public commentForm: FormGroup | undefined;

  public articleId: number;
  public userId: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private sessionService: SessionService,
    private articleApiService: ArticleApiService,
    private commentApiService: CommentApiService,
    private router: Router) {
    this.articleId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = this.sessionService.sessionInformation!.id;
  }

  public ngOnInit(): void {
    this.fetchArticle();
    this.loadComments();
    this.initCommentForm();
  }

  public back() {
    window.history.back();
  }

  private fetchArticle(): void {
    this.articleApiService
      .detail(this.articleId)
      .subscribe((article: Article) => {
        this.article = article;
      });
  }

  private loadComments(): void {
    this.commentApiService.allByArticle(this.articleId).subscribe((data: any) => {
      console.log(data);
      this.comments = data.comments;
    });
  }

  private initCommentForm(): void {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(2000)]],
      article_id: [this.articleId]
    });
  }

public submit(): void {
  const comment = this.commentForm?.value as Comment;

  this.commentApiService.create(comment).subscribe(
    (createdComment: Comment) => {
      // Met à jour la liste des commentaires avec le nouveau commentaire
      this.comments.push(createdComment);
      this.commentForm?.reset();

      // Rafraîchit manuellement la liste des commentaires
      this.loadComments();
    },
    (error) => {
      console.error('Error creating comment:', error);
    }
  );
}

}