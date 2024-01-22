import { Component } from '@angular/core';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../buttons/secondary-button/secondary-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryButtonComponent, SecondaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private route: Router) {}
  home() {
    this.route.navigate(['/']);
  }

  portfolio() {
    this.route.navigate(['/portfolio']);
  }

  signIn() {
    this.route.navigate(['/login']);
  }
  signUp() {
    this.route.navigate(['/signUp']);
  }
}
