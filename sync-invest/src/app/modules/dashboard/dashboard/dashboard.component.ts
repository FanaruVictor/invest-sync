import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentPageService } from '../../../services/ui/current-page.service';
import { BinanceApiService } from '../../../services/API/binance-api.service';
import { CommonModule } from '@angular/common';
import { Coin } from '../../../common/models/coin';
import { WebSocketService } from '../../../services/binance-webSocket.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  symbols: Coin[] = [];
  ws?: Subscription;

  constructor(
    private currentPageService: CurrentPageService,
    private binanceService: BinanceApiService,
    private webSocketService: WebSocketService
  ) {
    // this.ws = this.webSocketService.connect()?.subscribe(
    //   (data) => {
    //     console.log('WebSocket Data:', data);
    //     // Handle the incoming data from the WebSocket
    //   },
    //   (error) => {
    //     console.error('WebSocket Error:', error);
    //     // Handle errors
    //   }
    // );
  }

  ngOnInit(): void {
    this.currentPageService.changePage('Home');
    this.symbols = this.binanceService.getSymbols();
    this.binanceService.symbols.subscribe((x) => (this.symbols = x));
  }

  ngOnDestroy() {
    this.ws?.unsubscribe();
  }
}
