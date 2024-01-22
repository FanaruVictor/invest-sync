import { Component } from '@angular/core';
import { SecondaryButtonComponent } from '../../../common/buttons/secondary-button/secondary-button.component';
import { NgClass } from '@angular/common';
import { CryptoComponent } from './crypto/crypto.component';
import { StocksComponent } from './stocks/stocks.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    SecondaryButtonComponent,
    NgClass,
    CryptoComponent,
    StocksComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  isCrypto = true;

  crypto() {
    this.isCrypto = true;
  }

  stocks() {
    this.isCrypto = false;
  }
}
