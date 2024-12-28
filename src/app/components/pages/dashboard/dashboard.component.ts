import { Component, inject } from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private messageServ = inject(MessageService);

  jatForm = new FormGroup({
    dateApplied: new FormControl('', Validators.required),
    response: new FormControl('', Validators.required), // declined, no response, interview, interested, rejected, accepted, offer made
    position: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required), // remote, hybrid, on-site
    source: new FormControl('', Validators.required), // careers page, linkedin,
    company: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    url: new FormControl(''),
    uri: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    notes: new FormControl(''),
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
