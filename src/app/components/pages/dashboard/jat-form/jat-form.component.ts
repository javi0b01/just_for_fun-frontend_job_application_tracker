import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isEqual } from 'lodash';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { IApp, INotify } from '../../../../interfaces/apiInterface';
import { ApplicationService } from '../../../../services/application.service';
import { StoreService } from '../../../../services/store.service';

interface IBase {
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
export class JatFormComponent implements OnInit {
  private appServ = inject(ApplicationService);
  private storeServ = inject(StoreService);

  @Input() currentApp: IApp | null = null;
  @Output() notifyEvent: EventEmitter<INotify> = new EventEmitter<INotify>();

  responses: IBase[] = [
    { label: 'No Response', value: 'no response' },
    { label: 'Interview', value: 'interview' },
    { label: 'Offer Made', value: 'offer made' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Declined', value: 'declined' },
    { label: 'Rejected', value: 'rejected' },
  ];

  models: IBase[] = [
    { label: 'Remote', value: 'remote' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'On-Site', value: 'on-site' },
  ];

  jatForm!: FormGroup;

  ngOnInit(): void {
    if (this.currentApp) {
      console.log('currentApp:', this.currentApp);
      this.jatForm = new FormGroup({
        job: new FormGroup({
          source: new FormControl<string | null>(
            this.currentApp.job.source,
            Validators.required
          ),
          uri: new FormControl<string | null>(this.currentApp.job.uri),
        }),
        company: new FormGroup({
          name: new FormControl<string | null>(
            this.currentApp.company.name,
            Validators.required
          ),
          contact: new FormControl<string | null>(
            this.currentApp.company.contact
          ),
          url: new FormControl<string | null>(this.currentApp.company.url),
          email: new FormControl<string | null>(this.currentApp.company.email),
          phone: new FormControl<string | null>(this.currentApp.company.phone),
        }),
        application: new FormGroup({
          dateApplied: new FormControl<Date | null>(
            this.currentApp.application.dateApplied,
            Validators.required
          ),
          response: new FormControl<string | null>(
            this.currentApp.application.response,
            Validators.required
          ),
          position: new FormControl<string | null>(
            this.currentApp.application.position,
            Validators.required
          ),
          model: new FormControl<string | null>(
            this.currentApp.application.model,
            Validators.required
          ),
          notes: new FormControl<string | null>(
            this.currentApp.application.notes
          ),
        }),
      });
    } else {
      this.jatForm = new FormGroup({
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
    }
  }

  handleSubmit() {
    if (this.jatForm.valid) {
      const payload = {
        ...this.jatForm.value,
      };
      if (payload.application) {
        const response: string = this.jatForm.value.application.response.value
          ? this.jatForm.value.application.response.value
          : this.currentApp
          ? this.currentApp.application.response
          : null;
        const model: string = this.jatForm.value.application.model.value
          ? this.jatForm.value.application.model.value
          : this.currentApp
          ? this.currentApp.application.model
          : null;
        payload.application.response = response;
        payload.application.model = model;
      }
      if (this.currentApp) {
        const before = {
          application: { ...this.currentApp.application },
          company: { ...this.currentApp.company },
          job: { ...this.currentApp.job },
        };
        const after = {
          application: { ...payload.application },
          company: { ...payload.company },
          job: { ...payload.job },
        };
        const areEqual = isEqual(before, after);
        if (areEqual) {
          this.notifyEvent.emit({
            severity: 'warn',
            summary: 'Nothing to update!',
            detail: 'There are no changes',
          });
        } else {
          console.log('TODO: update');
        }
      } else {
        payload.userId = this.storeServ.getUserId();
        this.appServ.newRegister(payload).subscribe({
          next: (res) => {
            this.notifyEvent.emit({
              severity: res.message.severity,
              summary: res.message.summary,
              detail: res.message.detail,
            });
            if (res.message.summary === 'Done!') {
              //this.router.navigateByUrl('/sign-in');
              console.log('TODO: Done!');
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
      }
    } else
      this.notifyEvent.emit({
        severity: 'warn',
        summary: 'Please!',
        detail: 'Missing required field',
      });
  }
}
