import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ApplicationService } from '../../../../services/application.service';
import { StoreService } from '../../../../services/store.service';

interface INotify {
  severity: string;
  summary: string;
  detail: string;
}

interface Response {
  label: string;
  value: string;
}

interface Model {
  label: string;
  value: string;
}

@Component({
  selector: 'app-jat-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './jat-form.component.html',
  styleUrl: './jat-form.component.scss',
})
export class JatFormComponent {
  private appServ = inject(ApplicationService);
  private storeServ = inject(StoreService);

  @Output() notifyEvent: EventEmitter<INotify> = new EventEmitter<INotify>();

  responses: Response[] = [
    { label: 'No Response', value: 'no response' },
    { label: 'Interview', value: 'interview' },
    { label: 'Offer Made', value: 'offer made' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Declined', value: 'declined' },
    { label: 'Rejected', value: 'rejected' },
  ];

  models: Model[] = [
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'On-Site', value: 'on-site' },
  ];

  jatForm = new FormGroup({
    job: new FormGroup({
      source: new FormControl<string | null>(null, Validators.required),
      uri: new FormControl<string | null>(null),
    }),
    company: new FormGroup({
      name: new FormControl<string | null>(null, Validators.required),
      contact: new FormControl<string | null>(null),
      url: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      phone: new FormControl<string | null>(null),
    }),
    application: new FormGroup({
      dateApplied: new FormControl<Date | null>(null, Validators.required),
      response: new FormControl<string | null>(null, Validators.required),
      position: new FormControl<string | null>(null, Validators.required),
      model: new FormControl<string | null>(null, Validators.required),
      notes: new FormControl<string | null>(null),
    }),
  });

  handleSubmit() {
    if (this.jatForm.valid) {
      const payload = {
        userId: this.storeServ.getUserId(),
        ...this.jatForm.value,
      };
      if (payload.application) {
        const response: any = this.jatForm.value.application?.response;
        const model: any = this.jatForm.value.application?.model;
        payload.application.response = response.value;
        payload.application.model = model.value;
      }
      this.appServ.newRegister(payload).subscribe({
        next: (res) => {
          this.notifyEvent.emit({
            severity: res.message.severity,
            summary: res.message.summary,
            detail: res.message.detail,
          });
          if (res.message.summary === 'Done!') {
            //this.router.navigateByUrl('/sign-in');
            console.log('Done!');
          }
        },
        error: (rej) => {
          this.notifyEvent.emit({
            severity: rej.error.message.severity,
            summary: rej.error.message.summary,
            detail: rej.error.message.detail,
          });
        },
      });
    } else
      this.notifyEvent.emit({
        severity: 'warn',
        summary: 'Please!',
        detail: 'Missing required field',
      });
  }
}
