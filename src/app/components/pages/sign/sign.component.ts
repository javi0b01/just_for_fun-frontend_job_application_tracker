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

@Component({
  selector: 'app-sign',
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
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss',
})
export class SignComponent {
  private messageServ = inject(MessageService);
  private signServ = inject(SignService);
  private router = inject(Router);

  private credentials: Credentials = {
    username: '',
    password: '',
  };

  isAmember = false;

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    cEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    cPassword: new FormControl('', Validators.required),
  });

  signInForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  handleSignUp() {
    if (this.signUpForm.value.cEmail && this.signUpForm.value.cPassword) {
      if (this.signUpForm.valid) {
        const emailConfirmed =
          this.signUpForm.value.email === this.signUpForm.value.cEmail;
        const passwordConfirmed =
          this.signUpForm.value.password === this.signUpForm.value.cPassword;
        if (emailConfirmed && passwordConfirmed) {
          this.credentials.username = this.signUpForm.value.cEmail;
          this.credentials.password = this.signUpForm.value.cPassword;
          this.signServ.signUp(this.credentials).subscribe({
            next: (res) => {
              this.notify(
                res.message.severity,
                res.message.summary,
                res.message.detail
              );
              if (res.message.summary === 'Done!') {
                this.isAmember = true;
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
        } else {
          this.notify(
            'warn',
            'Please!',
            'Confirm your email and your password'
          );
        }
      }
    } else {
      this.notify(
        'warn',
        'Please!',
        'Enter and confirm your email and your password'
      );
    }
  }

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
              this.router.navigateByUrl('/dashboard');
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
