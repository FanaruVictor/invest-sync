import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './common/navigation/navigation.component';
import { HeaderComponent } from './common/header/header.component';
import { TopComponent } from './components/top/top.component';
import { HomeComponent } from './components/home/home.component';
import { CurrentPageService } from './services/ui/current-page.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    HeaderComponent,
    TopComponent,
    HomeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'SyncInvest';
  isLoggedIn = true;

  constructor(
    private router: Router,
    private currentPathService: CurrentPageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.isLoggedIn) {
      return;
    }

    this.router.navigate(['']);
  }
}
