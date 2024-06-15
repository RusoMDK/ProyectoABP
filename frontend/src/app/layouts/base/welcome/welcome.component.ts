import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isCollapsedLeft = false;

  @HostListener('window:resize')
  onResize(): void {
    this.adjustVideoWidth();
  }

  toggleMenu(): void {
    this.isCollapsedLeft = !this.isCollapsedLeft;
    this.adjustVideoWidth();
  }

  adjustVideoWidth(): void {
    const videoSection = document.querySelector('.video-section') as HTMLElement;
    if (videoSection) {
      if (this.isCollapsedLeft) {
        videoSection.style.width = '100%'; // Expandir a todo el ancho disponible
      } else {
        videoSection.style.width = 'calc(100% - 0px)'; // Ajustar para restar el ancho del menú lateral
      }
    }
  }

  ngOnInit(): void {
    this.adjustVideoWidth();
  }
}
