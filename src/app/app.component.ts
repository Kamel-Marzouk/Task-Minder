import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/services/authentication.service';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TaskMinder';

  constructor(
    private auth: AuthenticationService,
    public translation: TranslationService
    ) { }

  ngOnInit(): void {
    this.auth.checkAuth();
    this.translation.setDefaultLang();
  }
}
