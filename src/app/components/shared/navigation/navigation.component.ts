import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
import { SignService } from '../../../services/sign.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, MenubarModule, TabMenuModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  private router = inject(Router);
  private signServ = inject(SignService);
  private storeServ = inject(StoreService);

  private isLoggedIn: Signal<boolean> = this.signServ.isLoggedIn;

  private isLoggedIn$ = toObservable(this.isLoggedIn);
  private observer$ = this.isLoggedIn$.subscribe((value: any) => {
    this.setMenu();
  });

  private home: MenuItem[] = [
    { route: '/home', label: 'Home', icon: 'pi pi-home' },
  ];
  private login: MenuItem[] = [
    { route: '/sign-in', label: 'Login', icon: 'pi pi-sign-in' },
  ];
  private dashboard: MenuItem[] = [
    { route: '/dashboard', label: 'Dashboard', icon: 'pi pi-chart-line' },
  ];
  private account: MenuItem[] = [
    { route: '/account', label: 'Account', icon: 'pi pi-user' },
  ];
  private logout: MenuItem[] = [
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.signServ.logout();
        this.setMenu();
        this.router.navigate(['/home']);
      },
    },
  ];

  items!: MenuItem[];

  ngOnInit(): void {
    this.setMenu();
  }

  setMenu() {
    if (!this.signServ.getIsLoggedIn())
      this.items = [...this.home, ...this.login];
    else {
      const profile = this.storeServ.getProfile();
      if (profile === 100 || profile === 200)
        this.items = [
          ...this.home,
          ...this.dashboard,
          ...this.account,
          ...this.logout,
        ];
      if (profile === 300) this.items = [...this.logout];
    }
  }
}
