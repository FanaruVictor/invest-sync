import { Component, HostListener } from '@angular/core';
import { SecondaryButtonComponent } from '../buttons/secondary-button/secondary-button.component';
import { Router } from '@angular/router';
import { IconButtonComponent } from '../buttons/icon-button/icon-button.component';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { CurrentPageService } from '../../services/ui/current-page.service';
@Component({
  selector: 'app-navigation',
  standalone: true,
  animations: [
    trigger('openClose', [
      state('open', style({ transform: 'translateX(0%)' })),
      state('closed', style({ transform: 'translateX(-100%)' })),
      transition('open => closed', [animate('0.3s')]),
      transition('closed => open', [animate('0.3s')]),
    ]),
  ],
  imports: [IconButtonComponent, SecondaryButtonComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  isOpen = false;

  closeNavigation() {
    if (window.innerWidth < 1025) {
      this.isOpen = false;
    }
  }

  openNavigation() {
    this.isOpen = true;
  }

  constructor(
    private route: Router,
    private currentPageService: CurrentPageService
  ) {}

  home() {
    this.currentPageService.changePage('Home');
    this.route.navigate(['/home']);
    this.closeNavigation();
  }

  portfolio() {
    this.currentPageService.changePage('Portfolio');
    this.route.navigate(['/portfolio']);
    this.closeNavigation();
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth >= 1025) {
      this.isOpen = true;
      return;
    }
    this.isOpen = false;
  }

  @HostListener('window:load')
  onLoad() {
    if (window.innerWidth >= 1025) {
      this.isOpen = true;
      return;
    }
    this.isOpen = false;
  }
}
