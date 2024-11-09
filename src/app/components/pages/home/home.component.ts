import { Component, inject, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private storeServ = inject(StoreService);
  private signServ = inject(SignService);

  ngOnInit(): void {
    this.storeServ.token = this.signServ.getLocalToken();
  }

  handleClick() {
    this.router.navigateByUrl('/sign');
  }
}
