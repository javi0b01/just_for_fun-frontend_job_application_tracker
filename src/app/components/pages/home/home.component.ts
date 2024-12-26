import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SignService } from '../../../services/sign.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private router = inject(Router);

  handleClick() {
    this.router.navigateByUrl('/sign-up');
  }
}
