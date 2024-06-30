import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SnakBarService } from 'src/app/shared/services/snak-bar.service';
import { TranslationService } from 'src/app/shared/services/translation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  name: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ]);
  confirmPassword: FormControl = new FormControl('', [
    Validators.required
  ]);

  resgisterForm: FormGroup = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password,
    confirmPassword: this.confirmPassword,
  });

  inSubmission: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private snakBarService: SnakBarService,
    private router: Router,
    private translate: TranslateService,
    public translation: TranslationService
  ) { }

  register(): void {
    this.inSubmission = true;
    this.snakBarService.openSnackBar(this.translate.instant('login.waitMessage'), this.translate.instant('signUp.waiting'));
    this.authenticationService.signup(this.resgisterForm.value, () => {
      this.resgisterForm.reset();
      this.snakBarService.openSnackBar(this.translate.instant('login.successMessage'), this.translate.instant('signUp.success'));
      this.router.navigate(['/']);
    }, () => {
      this.snakBarService.openSnackBar(this.translate.instant('error.errorMessage'), this.translate.instant('error.error'));
      this.inSubmission = false;
      return;
    });
  }
}
