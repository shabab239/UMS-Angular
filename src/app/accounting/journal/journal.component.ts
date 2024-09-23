import { Component, OnInit } from '@angular/core';
import { JournalEntry } from '../model/journal.model';
import { ApiResponse } from '../../util/api.response.model';
import { AccountingService } from '../accounting.service';
import { AlertService } from '../../util/alert.service';
import { AlertUtil } from '../../util/alert.util';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  journalEntries: JournalEntry[] = [];
  errors: { [key: string]: string } = {};

  constructor(
    private accountingService: AccountingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadJournal();
  }

  loadJournal(): void {
    this.accountingService.getJournal().subscribe({
      next: (response: ApiResponse) => {
        if (response && response.successful) {
          this.journalEntries = response.data['journalEntries'];
        } else {
          this.errors = response?.errors || {};
          AlertUtil.showError(response, this.alertService);
        }
      },
      error: error => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  parseDate(dateString: string): Date {
    const [day, month, year, hour, minute] = dateString.split(/[- :]/);
    return new Date(+year, +month - 1, +day, +hour, +minute);
  }

  getTotalDebit(): number {
    return this.journalEntries.reduce((total, entry) => total + entry.debit, 0);
  }

  getTotalCredit(): number {
    return this.journalEntries.reduce((total, entry) => total + entry.credit, 0);
  }

  isEqual(): boolean {
    return this.getTotalDebit() === this.getTotalCredit();
  }

  generatePDF(): void {
    const doc = new jsPDF();

    doc.text('Journal Entries', 14, 20);

    autoTable(doc, { html: '#journal-entries', startY: 30});

    doc.save('table.pdf');
  }

}
