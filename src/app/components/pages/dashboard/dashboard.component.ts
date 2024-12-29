import { Component, inject } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';

interface Response {
  label: string;
  value: string;
}

interface Model {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dashboard',
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
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private messageServ = inject(MessageService);

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
    console.log('handle submit');
    console.log(this.jatForm.value);
  }

  notify(severity: string, summary: string, detail: string) {
    this.messageServ.add({
      severity,
      summary,
      detail,
    });
  }
}
