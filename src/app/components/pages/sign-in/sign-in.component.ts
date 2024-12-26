import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SignService } from '../../../services/sign.service';
import { Credentials } from '../../../interfaces/sign';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private messageServ = inject(MessageService);
  private signServ = inject(SignService);
  private storeServ = inject(StoreService);
  router = inject(Router);

  private credentials: Credentials = {
    username: '',
    password: '',
  };

  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  handleSignIn() {
    if (this.signInForm.value.username && this.signInForm.value.password) {
      if (this.signInForm.valid) {
        this.credentials.username = this.signInForm.value.username;
        this.credentials.password = this.signInForm.value.password;
        this.signServ.signIn(this.credentials).subscribe({
          next: (res) => {
            this.notify(
              res.message.severity,
              res.message.summary,
              res.message.detail
            );
            if (res.message.summary === 'Done!') {
              this.signServ.login(res.data.token);
              const profile: number | null = this.storeServ.getProfile();
              if (profile === 100 || profile === 200 || profile === 300) {
                if (profile === 300) this.router.navigateByUrl('/account');
                else this.router.navigateByUrl('/dashboard');
              } else this.notify('warn', 'Please!', 'Try again');
            }
          },
          error: (rej) => {
            this.notify(
              rej.error.message.severity,
              rej.error.message.summary,
              rej.error.message.detail
            );
          },
        });
      }
    } else {
      this.notify('warn', 'Please!', 'Type your email and your password');
    }
  }

  notify(severity: string, summary: string, detail: string) {
    this.messageServ.add({
      severity,
      summary,
      detail,
    });
  }
}
