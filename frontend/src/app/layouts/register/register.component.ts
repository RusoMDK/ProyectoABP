import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/_services/authentication.service';

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

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group(
            {
                name: ['', Validators.required],
                username: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', Validators.required],
            },
            { validator: this.matchingPasswords('password', 'confirmPassword') },
        );
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        console.log('Formulario enviado');

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            console.log('Formulario inválido', this.registerForm.errors);
            return;
        }

        this.loading = true;
        console.log('Datos del formulario', this.registerForm.value);
        this.authenticationService.register(this.registerForm.value).subscribe(
            (data) => {
                console.log('Registro exitoso', data);
                this.router.navigate(['/login']);
            },
            (error) => {
                console.log('Error en el registro', error);
                this.error = error;
                this.loading = false;
            },
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
}
