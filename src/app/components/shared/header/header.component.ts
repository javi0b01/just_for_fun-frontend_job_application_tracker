import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { StoreService } from '../../../services/store.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarModule, TooltipModule, InputSwitchModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  #document = inject(DOCUMENT);
  storeServ = inject(StoreService);

  isDarkMode = false;

  constructor() {
    if (this.isSystemDark()) {
      this.toggleTheme();
    }
  }

  isSystemDark(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;
  }

  toggleTheme() {
    const $appTheme = this.#document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;
    if ($appTheme.href.includes('light')) {
      $appTheme.href = 'theme-dark.css';
      this.isDarkMode = true;
    } else {
      $appTheme.href = 'theme-light.css';
      this.isDarkMode = false;
    }
  }
}
