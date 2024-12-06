import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { SignService } from '../../../services/sign.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, TabMenuModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  private router = inject(Router);
  private signServ = inject(SignService);

  private menuBase: MenuItem[] = [
    { route: '/home', label: 'Home', icon: 'pi pi-home' },
  ];
  private optionA: MenuItem[] = [
    { route: '/sign-in', label: 'Login', icon: 'pi pi-sign-in' },
  ];
  private optionB: MenuItem[] = [
    { route: '/dashboard', label: 'Dashboard', icon: 'pi pi-chart-line' },
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
    if (!this.signServ.isLoggedIn())
      this.items = [...this.menuBase, ...this.optionA];
    else this.items = [...this.menuBase, ...this.optionB];
  }
}
