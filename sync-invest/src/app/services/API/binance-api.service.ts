import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Coin } from '../../common/models/coin';

@Injectable({
  providedIn: 'root',
})
export class BinanceApiService {
  baseURL = environment.binanceAPIBaseURL;

  symbols = new BehaviorSubject<Coin[]>([]);

  constructor(private httpClient: HttpClient) {}

  registerSymbols() {
    return this.httpClient.get<Coin[]>(
      `https://api4.binance.com/api/v3/ticker/price`
    );
  }

  setSymbols(symbols: Coin[]) {
    sessionStorage.setItem('symbols', JSON.stringify(symbols));
    this.symbols.next(symbols);
  }

  getSymbols(): Coin[] {
    return this.symbols.value;
  }
}
