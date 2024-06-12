import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsService } from '../../core/_services/translations.service';
import { ApplicatioMessages } from '../../core/utils/messages/applicationMessages';
import { LoadingSpinnerService } from 'src/app/core/spinner/spinner.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error = '';

  passwordVisible = false;
  showForgotPassword = false;

  aplicationMessages = ApplicatioMessages;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private translations: TranslationsService,
    private loadingSpinner: LoadingSpinnerService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.translate.addLangs(this.translations.getSystemLanguages());
    this.translate.setDefaultLang(this.translations.getProfileLanguage());

    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
          this.router.navigate([this.returnUrl]);

          // stop here if form is invalid
          if (this.loginForm.invalid) {
            return;
          }
        
          this.loading = true;
          const credentials = {
            username: this.f['username'].value,
            password: this.f['password'].value
          };
        
          this.authenticationService.login(credentials.username,credentials.password)
            .pipe(first())
            .subscribe(
              () => {
                this.router.navigate([this.returnUrl]);
              },
              error => {
                this.error = error;
                this.loading = false;
              });
        }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
