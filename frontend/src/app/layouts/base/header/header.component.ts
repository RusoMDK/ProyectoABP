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
    this.userName = JSON.parse(localStorage.getItem('userData') as string)[
      'username'
    ];
    // Por algún motivo no funcionan:
    // this.periodoCurrent = this.periodoList[0].name;
    // this.tipoCurrent = this.tipoList[0].name;
    // this.menuCurrent = this.menuList[0].name;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isCollapsedMethod() {
    this.changeIsCollapsed.emit(!this.isCollapsed);
    this.isCollapsed = !this.isCollapsed;
  }
}
