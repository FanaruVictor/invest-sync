import { Component, Input, OnInit } from '@angular/core';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { CurrentPageService } from '../../services/ui/current-page.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryButtonComponent, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn = false;
  currentPage: string = '';

  constructor(
    private route: Router,
    private currentPageService: CurrentPageService
  ) {}

  ngOnInit(): void {
    this.currentPageService.currentPage.subscribe((x) => {
      this.currentPage = x;
    });
  }

  signIn() {
    this.route.navigate(['/login']);
  }

  signUp() {
    this.route.navigate(['/signUp']);
  }
}
