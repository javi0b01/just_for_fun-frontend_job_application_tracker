import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { ApplicationService } from '../../../../services/application.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

interface INotify {
  severity: string;
  summary: string;
  detail: string;
}

interface Column {
  type?: string;
  section: string;
  field: string;
  header: string;
}

@Component({
  selector: 'app-jat-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './jat-table.component.html',
  styleUrl: './jat-table.component.scss',
})
export class JatTableComponent implements OnInit {
  private appServ = inject(ApplicationService);

  @Output() notifyEvent: EventEmitter<INotify> = new EventEmitter<INotify>();

  cols!: Column[];

  apps!: any[];

  ngOnInit(): void {
    this.appServ.getList().subscribe({
      next: (res) => {
        this.notifyEvent.emit({
          severity: res.message.severity,
          summary: res.message.summary,
          detail: res.message.detail,
        });
        this.apps = res.data;
      },
      error: (rej) => {
        this.notifyEvent.emit({
          severity: rej.error.message.severity,
          summary: rej.error.message.summary,
          detail: rej.error.message.detail,
        });
        this.apps = [];
      },
    });

    this.cols = [
      { section: 'job', field: 'source', header: 'SOURCE' },
      { type: 'link', section: 'job', field: 'uri', header: 'URI' },
      { section: 'company', field: 'name', header: 'NAME' },
      { section: 'company', field: 'contact', header: 'CONTACT' },
      { type: 'link', section: 'company', field: 'url', header: 'URL' },
      { section: 'company', field: 'email', header: 'EMAIL' },
      { section: 'company', field: 'phone', header: 'PHONE' },
      {
        type: 'date',
        section: 'application',
        field: 'dateApplied',
        header: 'DATE APPLIED',
      },
      { section: 'application', field: 'response', header: 'RESPONSE' },
      { section: 'application', field: 'position', header: 'POSITION' },
      { section: 'application', field: 'model', header: 'MODEL' },
      { section: 'application', field: 'notes', header: 'NOTES' },
    ];
  }
}
