import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FileUploadModule,
    InputNumberModule,
    CalendarModule,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  apiServ = inject(ApiService);

  accountForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    nickname: new FormControl(''),
    image: new FormControl(''),
    phone: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
  });

  handleSelect(e: FileSelectEvent) {
    // UploadEvent
    console.log('handle select e:', e);
  }

  handleSubmit() {
    console.log(this.accountForm.value);
    this.apiServ.getRoot().subscribe((res) => console.log(res));
  }
}
