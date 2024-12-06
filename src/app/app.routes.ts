import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AccountComponent } from './components/pages/account/account.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';

const title = ' | JAT';

export const routes: Routes = [
  { path: 'account', title: `Account${title}`, component: AccountComponent },
  {
    path: 'dashboard',
    title: `Dashboard${title}`,
    canActivate: [authGuard],
    component: DashboardComponent,
  },
  { path: 'home', title: `Home${title}`, component: HomeComponent },
  { path: 'sign-in', title: `Sign In${title}`, component: SignInComponent },
  { path: 'sign-up', title: `Sign Up${title}`, component: SignUpComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    title: `Page Not Found${title}`,
    component: PageNotFoundComponent,
  },
];
