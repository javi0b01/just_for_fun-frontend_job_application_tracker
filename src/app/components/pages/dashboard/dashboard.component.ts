import { Component, inject, OnInit } from '@angular/core';
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
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ApplicationService } from '../../../services/application.service';
import { StoreService } from '../../../services/store.service';

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
    TableModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private messageServ = inject(MessageService);
  private appServ = inject(ApplicationService);
  private storeServ = inject(StoreService);

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

  products: any[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
  ];

  ngOnInit(): void {
    this.appServ.getList().subscribe((list) => console.log('list:', list));
  }

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
          this.notify(
            res.message.severity,
            res.message.summary,
            res.message.detail
          );
          if (res.message.summary === 'Done!') {
            //this.router.navigateByUrl('/sign-in');
            console.log('Done!');
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
    } else this.notify('warn', 'Please!', 'Missing required field');
  }

  notify(severity: string, summary: string, detail: string) {
    this.messageServ.add({
      severity,
      summary,
      detail,
    });
  }
}
