import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { JatFormComponent } from './jat-form/jat-form.component';
import { JatTableComponent } from './jat-table/jat-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JatFormComponent, JatTableComponent, ToastModule, ButtonModule],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private messageServ = inject(MessageService);

  showForm: boolean = false;

  notify(severity: string, summary: string, detail: string) {
    this.messageServ.add({
      severity,
      summary,
      detail,
    });
  }
}
