import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output()
  changeIsCollapsed = new EventEmitter<boolean>();

  isCollapsed = false;
  userName = '';
  userTime = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData') as string);
    this.userName = userData ? userData['username'] : 'Nombre de Usuario';
    this.userTime = userData ? userData['membershipDate'] : 'hace mucho tiempo';
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isCollapsedMethod() {
    this.isCollapsed = !this.isCollapsed;
    console.log('isCollapsed:', this.isCollapsed);
    this.changeIsCollapsed.emit(this.isCollapsed);
  }
  
}
