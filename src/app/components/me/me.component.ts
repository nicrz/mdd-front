import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { SessionService } from '../../services/session.service';
import { User } from 'src/app/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Theme } from '../../features/themes/interfaces/theme.interface';
import { ThemeApiService } from '../../features/themes/services/theme-api.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit, OnDestroy {

  public user: User | undefined;
  public userForm: FormGroup | undefined;
  public userId: number;
  public subscribedThemes: Theme[] = [];
  public hasSubscribe: boolean = false;
  private userSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private snackBar: MatSnackBar,
    private themeApiService: ThemeApiService,
    private router: Router
    ) { this.userId = this.sessionService.sessionInformation!.id; }

    public ngOnInit(): void {
      this.userSubscription = this.authService.me().subscribe(
        (user: User) => {
          this.user = user;
          this.initUserUpdateForm();
  
          // Charge les thèmes abonnés
          this.loadSubscribedThemes();
        },
        (error: any) => {
          console.error("Erreur lors de la récupération de l'utilisateur :", error);
        }
      );
    }

  private initUserUpdateForm(): void {
    const user = this.sessionService.sessionInformation;
  
    if (user) {
      this.userForm = this.fb.group({
        username: [user.username, [Validators.required, Validators.min(3)]],
        email: [user.email, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.min(3)]]
      });
    } else {
      console.error("Informations de l'utilisateur non disponibles.");
    }
  }

  public submit(): void {
    const updatedUser: User = {
      ...this.user!,
      ...this.userForm?.value
    };

    this.authService.update(this.userId, updatedUser).subscribe(
      (response: any) => {
        // Met à jour les informations de l'utilisateur dans le service de session
        this.sessionService.sessionInformation = updatedUser;

        // Met à jour directement les propriétés du composant avec les nouvelles données
        this.initUserUpdateForm();

      this.snackBar.open('Commentaire créé !', 'Fermer', {
        duration: 2000,
      });


      },
      (error: any) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);

      }
    );
  }

  private loadSubscribedThemes(): void {
    if (this.user && this.user.id) {
      this.themeApiService.all().subscribe((data: any) => {
        const themes: Theme[] = data.themes;
  
        // Filtre les thèmes souscrits
        this.subscribedThemes = themes.filter((theme: any) =>
          theme.users.some((user: any) => user.id === this.user?.id)
        );
      });
    }
  }

public unSubscribe(themeId: number): void {
  if (this.user) {
    this.themeApiService.unSubscribe(themeId, this.user.id).subscribe(() => {
      this.hasSubscribe = false;

      // Met à jour immédiatement theme.isSubscribed
      const themeIndex = this.subscribedThemes.findIndex(t => t.id === themeId);
      if (themeIndex !== -1) {
        this.subscribedThemes.splice(themeIndex, 1);
      }
    });
  }
}

  public ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }


  public back() {
    window.history.back();
  }

}
