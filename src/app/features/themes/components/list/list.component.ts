import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { SessionInformation } from '../../../../interfaces/sessionInformation.interface';
import { SessionService } from '../../../../services/session.service';
import { Theme } from '../../interfaces/theme.interface';
import { ThemeApiService } from '../../services/theme-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit { 

  public themes: Theme[] = [];
  public user: User | undefined;
  public hasSubscribe: boolean = false;
  public selectedThemeId: number | undefined;

  constructor(
    private sessionService: SessionService,
    private themeApiService: ThemeApiService
  ) { }

  ngOnInit() {
    this.loadThemes(); // Charge les thèmes lors du chargement initial de la page

    // Récupére l'utilisateur connecté depuis le service Session
    this.sessionService.$isLogged().subscribe((isLogged) => {
      this.user = this.sessionService.sessionInformation;
      if (isLogged) {
        this.loadThemes(); // Recharge les thèmes si l'utilisateur s'est connecté
      }
    });
  }

  // Charge les thèmes depuis le service
  private loadThemes(): void {
    this.themeApiService.all().subscribe((data: any) => {
      console.log(data); // Vérifie les données renvoyées par le service
      this.themes = data.themes; // Assigne les thèmes déballés à la propriété
      this.updateSubscriptionStatus(); // Met à jour les statuts d'abonnement
    });
  }

public subscribe(themeId: number): void {
  if (this.user) {
    this.themeApiService.subscribe(themeId, this.user.id).subscribe(() => {
      this.hasSubscribe = true;

      // Met à jour immédiatement theme.isSubscribed
      const theme = this.themes.find(t => t.id === themeId);
      if (theme) {
        theme.isSubscribed = true;
      }
    });
  }
}

public unSubscribe(themeId: number): void {
  if (this.user) {
    this.themeApiService.unSubscribe(themeId, this.user.id).subscribe(() => {
      this.hasSubscribe = false;

      // Met à jour immédiatement theme.isSubscribed
      const theme = this.themes.find(t => t.id === themeId);
      if (theme) {
        theme.isSubscribed = false;
      }
    });
  }
}

  // Met à jour les statuts d'abonnement
  public updateSubscriptionStatus(): void {
    if (this.user && this.user.id) {
      this.themes.forEach((theme: Theme) => {
        theme.isSubscribed = theme.users ? theme.users.some(user => user && user.id === this.user?.id) : false;
      });
    }
  }
}