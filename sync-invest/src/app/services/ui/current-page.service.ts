import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentPageService {
  currentPage = new BehaviorSubject<string>('');
  constructor() {}

  changePage(page: string) {
    this.currentPage.next(page);
  }
}
