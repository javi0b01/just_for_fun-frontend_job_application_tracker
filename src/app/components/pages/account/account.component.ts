import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { delay, of } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { IUserInfo } from '../../../interfaces/userInterface';
import { StoreService } from '../../../services/store.service';
import { UserService } from '../../../services/user.service';
import { SignService } from '../../../services/sign.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileUploadModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ToastModule,
    RippleModule,
    MessagesModule,
  ],
  providers: [MessageService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private router = inject(Router);
  private messageServ = inject(MessageService);
  private signServ = inject(SignService);
  private storeServ = inject(StoreService);
  private userServ = inject(UserService);

  private recordId: string | null = null;
  private image: File | null = null;

  private currentSession$ = this.storeServ.currentSession$;

  isLoggedIn!: boolean;

  currentSession: IUserInfo | null = null;
  accountForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    nickname: new FormControl(''),
    phone: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
  });
  message: Message[] = [
    { severity: 'warn', summary: 'Please!', detail: 'Login!' },
  ];

  ngOnInit(): void {
    this.isLoggedIn = this.signServ.getIsLoggedIn();
    if (!this.isLoggedIn) {
      this.redirectToLogin();
    } else {
      this.recordId = this.storeServ.getRecordId();
      if (this.recordId) {
        this.currentSession$.subscribe((data) => {
          if (data) {
            this.currentSession = data;
            this.accountForm.setValue({
              firstName: this.currentSession.firstName,
              lastName: this.currentSession.lastName,
              nickname: this.currentSession.nickname,
              phone: this.currentSession.phone,
              birthDay: this.currentSession.birthDay.toString(),
            });
          }
        });
      }
    }
  }

  redirectToLogin(): void {
    const observable = of('');
    const unaryFunction = observable.pipe(delay(3000));
    unaryFunction.subscribe((result: any) => {
      this.router.navigateByUrl('/sign-in');
    });
  }

  handleSelect(e: FileSelectEvent) {
    const file: File = e.currentFiles[0];
    if (file.type != 'image/png') {
      this.notify('warn', 'Please!', 'Upload your image in png format');
      return;
    }
    if (file.size > 1024000) {
      this.notify('warn', 'Please!', 'Upload your image must be 1Mb maximun');
      return;
    }
    this.image = e.currentFiles[0];
  }

  handleSubmit() {
    if (!this.image) {
      this.notify('warn', 'Please!', 'Upload your image');
      return;
    }
    if (this.accountForm.invalid) {
      this.notify('warn', 'Please!', 'Check all fields');
      return;
    }
    if (this.accountForm.valid) {
      const user: any = {
        ...this.accountForm.value,
        image: this.image,
        recordId: this.recordId,
      };
      this.userServ.createUser(user).subscribe({
        next: (res) => {
          this.notify(
            res.message.severity,
            res.message.summary,
            res.message.detail
          );
          if (res.message.summary === 'Done!') {
            this.router.navigateByUrl('/dashboard');
          } else {
            this.notify(
              res.message.severity,
              res.message.summary,
              res.message.detail
            );
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
  }

  notify(severity: string, summary: string, detail: string) {
    this.messageServ.add({
      severity,
      summary,
      detail,
    });
  }
}
