import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarModule, TooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  storeServ = inject(StoreService);
}
