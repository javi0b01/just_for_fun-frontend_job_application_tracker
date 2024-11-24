import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ApiService } from '../../../services/api.service';
import { StoreService } from '../../../services/store.service';
import { IUser } from '../../../interfaces/userInterface';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileUploadModule,
    InputNumberModule,
    CalendarModule,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  private apiServ = inject(ApiService);
  private messageServ = inject(MessageService);
  private storeServ = inject(StoreService);
  private router = inject(Router);

  private recordId: string | null = null;

  accountForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    nickname: new FormControl(''),
    image: new FormControl(''),
    phone: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.recordId = this.storeServ.recordId;
    if (!this.recordId) {
      this.notify('warn', 'Please!', 'Login');
      this.router.navigateByUrl('/sign-in');
    }
  }

  handleSelect(e: FileSelectEvent) {
    // UploadEvent
    console.log('handle select e:', e);
  }

  handleSubmit() {
    if (this.accountForm.invalid) {
      this.notify('warn', 'Please!', 'Check all fields ');
      return;
    }
    if (this.accountForm.valid) {
      console.log(this.accountForm.value);
      const user: any = {
        ...this.accountForm.value,
        recordId: this.recordId,
      };
      console.log('user:', user);
      this.apiServ.getRoot().subscribe((res) => console.log(res));
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
