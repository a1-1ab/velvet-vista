import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full'
  },
  {
    path: 'watches',
    loadComponent: () => import('./pages/watches/watches.component').then(m => m.WatchesComponent)
  },
  {
    path: 'watches/:id',
    loadComponent: () => import('./pages/watch-detail/watch-detail.component').then(m => m.WatchDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
