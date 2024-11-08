import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
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
  ],
  providers: [MessageService],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss',
})
export class SignComponent {
  private messageService = inject(MessageService);
  private signService = inject(SignService);

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
          this.signService.signUp(this.credentials).subscribe({
            next: (res) => {
              if (res.id) {
                this.showMsgSuccess();
              } else throw new Error('Oops!');
            },
            error: (rej) => this.showMsgError(),
          });
        } else {
          this.showMsgDontmatch();
        }
      }
    }
  }

  handleSignIn() {
    console.log('handle sign in');
    this.signService.getRoot().subscribe({
      next: (res) => {
        console.log('res:', res);
      },
      error: (rej) => {
        console.log('rej:', rej);
      },
    });
  }

  showMsgError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred.',
    });
  }

  showMsgDontmatch() {
    this.messageService.add({
      severity: 'warn',
      summary: "Don't match",
      detail: 'Please, confirm your email and your password.',
    });
  }

  showMsgSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Sign Up Successfully.',
    });
  }
}
