import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/_services/authentication.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');
    const browserLang = this.translate.getBrowserLang() || 'es';
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: this.matchingPasswords('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    console.log('Datos del formulario', this.registerForm.value);
    this.authenticationService.register(this.registerForm.value).subscribe(
      data => {
        console.log('Registro exitoso', data);
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Error en el registro', error);
        this.error = error;
        this.loading = false;
      }
    );
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const confirmPasswordInput = group.controls[confirmPasswordKey];
      if (passwordInput.value !== confirmPasswordInput.value) {
        return confirmPasswordInput.setErrors({ notEquivalent: true });
      } else {
        return confirmPasswordInput.setErrors(null);
      }
    };
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
}
