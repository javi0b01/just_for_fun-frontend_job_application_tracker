import { DOCUMENT } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { InputSwitchModule } from 'primeng/inputswitch';
import { IUserInfo } from '../../../interfaces/userInterface';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarModule, TooltipModule, InputSwitchModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  #document = inject(DOCUMENT);
  storeServ = inject(StoreService);

  private themeSelected!: string | null;
  private $appTheme = this.#document.getElementById(
    'app-theme'
  ) as HTMLLinkElement;

  private currentSession$ = this.storeServ.currentSession$;
  private observer$ = this.currentSession$.subscribe(
    (data) => (this.currentSession = data)
  );

  isDarkMode!: boolean;

  currentSession: IUserInfo | null = null;

  ngOnInit(): void {
    this.themeSelected = localStorage.getItem('JAT-theme');
    if (this.themeSelected) {
      this.themeSelected === 'dark'
        ? (this.isDarkMode = true)
        : (this.isDarkMode = false);
      if (!this.$appTheme.href.includes(this.themeSelected))
        this.toggleTheme();
    } else if (this.isSystemDark()) this.toggleTheme();
  }

  isSystemDark(): boolean {
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches;
  }

  toggleTheme() {
    if (this.$appTheme.href.includes('light')) {
      this.$appTheme.href = 'theme-dark.css';
      this.isDarkMode = true;
      this.themeSelected = 'dark';
    } else {
      this.$appTheme.href = 'theme-light.css';
      this.isDarkMode = false;
      this.themeSelected = 'light';
    }
    localStorage.setItem('JAT-theme', this.themeSelected);
  }
}
