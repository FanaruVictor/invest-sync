import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './common/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./modules/portfolio/portfolio.module').then(
        (m) => m.PortfolioModule
      ),
  },
  {
    path: '**',
    redirectTo: 'notfound',
  },
];
