import { Component, inject } from '@angular/core';
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
export class NavigationComponent {
  private router = inject(Router);
  private signServ = inject(SignService);

  items: MenuItem[] = [
    { route: '/home', label: 'Home', icon: 'pi pi-home' },
    { route: '/dashboard', label: 'Dashboard', icon: 'pi pi-chart-line' },
    { route: '/sign', label: 'Login', icon: 'pi pi-sign-in' },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        this.signServ.logout();
        this.router.navigate(['/home']);
      },
    },
  ];
}
