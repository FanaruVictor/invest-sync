import { Component, OnInit } from '@angular/core';
import { SecondaryButtonComponent } from '../../../common/buttons/secondary-button/secondary-button.component';
import { NgClass } from '@angular/common';
import { CryptoComponent } from './crypto/crypto.component';
import { StocksComponent } from './stocks/stocks.component';
import { CurrentPageService } from '../../../services/ui/current-page.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    SecondaryButtonComponent,
    NgClass,
    CryptoComponent,
    StocksComponent,
  ],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  isCrypto = true;

  constructor(private currentPageService: CurrentPageService) {}

  ngOnInit(): void {
    this.currentPageService.changePage('Portfolio');
  }

  crypto() {
    this.isCrypto = true;
  }

  stocks() {
    this.isCrypto = false;
  }
}
