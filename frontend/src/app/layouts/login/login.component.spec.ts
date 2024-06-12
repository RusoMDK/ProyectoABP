import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsService } from 'src/app/core/_services/translations.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let formBuilder: FormBuilder;
  let route: ActivatedRoute;
  let router: Router;
  let authenticationService: AuthenticationService;
  let http: HttpClient;
  let translate: TranslateService;
  let translations: TranslationsService;

  beforeEach(() => {
    (formBuilder = new FormBuilder()), (route = new ActivatedRoute());
    component = new LoginComponent(
      formBuilder,
      route,
      router,
      authenticationService,
      http,
      translate,
      translations,
    );
  });

  afterEach(() => {
    component = null;
  });

  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['username'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.loading).toBeFalsy();
    expect(component.submitted).toBeFalsy();
    expect(component.returnUrl).toBeDefined();
    expect(component.hide).toBeFalsy();
    expect(component.error).toEqual('');
  });

  it('The user and password are empty', () => {
    updateForm('', '');
    expect(component.submitted).toBeTruthy();
    expect(component.loginForm.invalid).toBeTruthy();
  });

  it('The user and password are invalids', () => {
    updateForm('usererror', 'passworderror');
    component.onSubmit();
    expect!(component.error).toEqual('');
  });

  it('The user is valid and password is invalid', () => {
    updateForm('user', 'passworderror');
    component.onSubmit();
    expect!(component.error).toEqual('');
  });

  it('The login successful', () => {
    updateForm('u@u.com', 'u');
    component.onSubmit();
    expect(component.error).toEqual('');
  });
});
