import { Component } from '@angular/core';
import { User } from '../../core/_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/_services/authentication.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  isCollapsedLeft = false;
  isCollapsedRight = false;
  name = '';

  currentUser!: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x),
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isCollapsedLeftChange() {
    this.isCollapsedLeft = !this.isCollapsedLeft;
    console.log(this.isCollapsedLeft);
  }
  isCollapsedRightChange() {
    this.isCollapsedRight = !this.isCollapsedRight;
  }
}
