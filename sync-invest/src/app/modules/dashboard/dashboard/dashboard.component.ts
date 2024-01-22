import { Component, OnInit } from '@angular/core';
import { CurrentPageService } from '../../../services/ui/current-page.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private currentPageService: CurrentPageService) {}

  ngOnInit(): void {
    this.currentPageService.changePage('Home');
  }
}
