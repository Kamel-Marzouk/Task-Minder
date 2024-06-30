import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SnakBarService } from 'src/app/shared/services/snak-bar.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);

  loginForm: FormGroup = new FormGroup({
    email: this.email,
    password: this.password
  });

  inSubmission: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private snakBarService: SnakBarService,
    private translate: TranslateService,
    public translation: TranslationService
  ) { }

  public login(): void {
    this.inSubmission = true;
    this.snakBarService.openSnackBar(this.translate.instant('login.waitMessage'), this.translate.instant('login.waiting'));
    this.authenticationService.login(this.loginForm.value, () => {
      this.snakBarService.openSnackBar(this.translate.instant('login.successMessage'), this.translate.instant('login.success'));
      this.loginForm.reset();
    }, () => {
      this.inSubmission = false;
      this.snakBarService.openSnackBar(this.translate.instant('error.errorMessage'), this.translate.instant('error.error'));
      return;
    })
  }
}
