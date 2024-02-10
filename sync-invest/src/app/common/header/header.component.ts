import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PrimaryButtonComponent } from '../buttons/primary-button/primary-button.component';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { CurrentPageService } from '../../services/ui/current-page.service';
import { BinanceApiService } from '../../services/API/binance-api.service';
import { FormsModule } from '@angular/forms';
import { Coin } from '../models/coin';
import { Subscriber, Subscription } from 'rxjs';
import { WebSocketService } from '../../services/binance-webSocket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [PrimaryButtonComponent, NgClass, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isLoggedIn = false;
  currentPage: string = '';
  symbols: Coin[] = [];
  @ViewChild('search') search?: ElementRef;
  searchResults: Coin[] = [];
  searchSubscriptions: (Subscription | undefined)[] = [];
  isSearchOpened = false;
  timeoutIds: NodeJS.Timeout[] = [];

  constructor(
    private route: Router,
    private currentPageService: CurrentPageService,
    private binanceApiService: BinanceApiService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.currentPageService.currentPage.subscribe((x) => {
      this.currentPage = x;
    });

    this.symbols = this.binanceApiService.getSymbols();
    this.binanceApiService.symbols.subscribe((x) => {
      this.symbols = x;
    });
  }

  showResults(): void {
    this.timeoutIds.forEach((x) => clearTimeout(x));

    if (!this.search || !this.symbols || this.symbols.length === 0) {
      return;
    }

    const value = this.search.nativeElement.value;

    if (!value || value.length === 0) {
      this.resetSearchResults();

      return;
    }

    this.searchSubscriptions.forEach((x) => x?.unsubscribe());
    this.searchSubscriptions = [];

    this.searchResults = this.symbols.filter((x) =>
      x.symbol.toLowerCase().startsWith(value.toLowerCase())
    );

    this.timeoutIds.push(
      setTimeout(() => {
        this.searchResults.forEach((x) => {
          this.searchSubscriptions.push(
            this.webSocketService
              .connectAvgPrice(x.symbol.toLowerCase())
              ?.subscribe(
                (data) => {
                  x.price = data['w'];
                  console.log('after search', data);
                },
                (error) => {
                  console.error('WebSocket Error:', error);
                }
              )
          );
        });
      }, 2000)
    );
  }

  openSearch() {
    this.isSearchOpened = true;

    this.resetSearchResults();
  }

  closeSearch() {
    this.isSearchOpened = false;
    this.searchSubscriptions.forEach((x) => x?.unsubscribe());
    this.searchSubscriptions = [];
  }

  clearSearch() {
    if (!this.search) {
      return;
    }

    this.search.nativeElement.value = '';
    this.resetSearchResults();
  }

  resetSearchResults() {
    this.searchSubscriptions.forEach((x) => x?.unsubscribe());
    this.searchResults = this.symbols
      .filter((x) => x.symbol.endsWith('USDT'))
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);

    this.searchResults.forEach((x) => {
      this.searchSubscriptions.push(
        this.webSocketService
          .connectAvgPrice(x.symbol.toLowerCase())
          ?.subscribe(
            (data) => {
              console.log(data);
              x.price = data['w'];
            },
            (error) => {
              console.error('WebSocket Error:', error);
            }
          )
      );
    });
  }

  signIn() {
    this.route.navigate(['/login']);
  }

  signUp() {
    this.route.navigate(['/signUp']);
  }

  ngOnDestroy(): void {
    this.searchSubscriptions.forEach((x) => x?.unsubscribe());
  }
}
