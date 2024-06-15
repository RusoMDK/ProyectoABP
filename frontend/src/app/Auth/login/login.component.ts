import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsService } from '../../core/_services/translations.service';
import { ApplicatioMessages } from '../../core/utils/messages/applicationMessages';
import { LoadingSpinnerService } from 'src/app/core/spinner/spinner.service';
import { first } from 'rxjs/operators';
import { LoginCredentials } from 'src/app/core/_models/login-credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang() || 'es';
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es');

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    console.log('Login form submitted'); // Debugging
  
    this.loading = true;
    const credentials: LoginCredentials = {
      usernameOrEmail: this.f['usernameOrEmail'].value,
      password: this.f['password'].value
    };
  
    this.authenticationService.login(credentials)
      .pipe(first())
      .subscribe(
        response => {
          console.log('Redirigiendo a /welcome', response); // Debugging
          this.router.navigate(['/welcome']);
        },
        error => {
          this.error = error;
          this.loading = false;
          console.error('Error de inicio de sesión:', error); // Debugging
        });
  }
  
  

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
