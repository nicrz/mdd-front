import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { SessionService } from '../../services/session.service';
import { User } from 'src/app/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) {  }

    public ngOnInit(): void {
      
    }

  goToLogin() {
   this.router.navigate(['/login']);
  }

  goToRegister() {
   this.router.navigate(['/register']);
  }



}
