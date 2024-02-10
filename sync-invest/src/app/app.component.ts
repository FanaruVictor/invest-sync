import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './common/navigation/navigation.component';
import { HeaderComponent } from './common/header/header.component';
import { TopComponent } from './components/top/top.component';
import { HomeComponent } from './components/home/home.component';
import { CurrentPageService } from './services/ui/current-page.service';
import { BinanceApiService } from './services/API/binance-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
    private activatedRoute: ActivatedRoute,
    private binanceService: BinanceApiService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const symbolsStringified = sessionStorage.getItem('symbol');
      if (!symbolsStringified || symbolsStringified.length === 0) {
        this.binanceService
          .registerSymbols()
          .subscribe((x: any) => this.binanceService.setSymbols(x));
      } else {
        const symbols = JSON.parse(symbolsStringified);
        this.binanceService.setSymbols(symbols);
      }
    }

    if (this.isLoggedIn) {
      this.router.navigate(['/home']);
      return;
    }

    this.router.navigate(['']);
  }
}
