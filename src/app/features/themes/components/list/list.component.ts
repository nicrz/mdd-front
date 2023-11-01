import { Component } from '@angular/core';
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
export class ListComponent {

  public themes: any = {};

  constructor(
    private sessionService: SessionService,
    private themeApiService: ThemeApiService
  ) { }

  ngOnInit() {
    this.themeApiService.all().subscribe((data: any) => {
      console.log(data); // Vérifiez les données renvoyées par le service
      this.themes = data.themes; // Assignez les thèmes déballés à la propriété
    });
  }

  get user(): User | undefined {
    return this.sessionService.sessionInformation;
  }
}