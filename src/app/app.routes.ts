import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { SignComponent } from './components/pages/sign/sign.component';

const title = ' | JAT';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: `Dashboard${title}`,
    component: DashboardComponent,
  },
  { path: 'home', title: `Home${title}`, component: HomeComponent },
  { path: 'sign', title: `Sign${title}`, component: SignComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    title: `Page Not Found${title}`,
    component: PageNotFoundComponent,
  },
];
