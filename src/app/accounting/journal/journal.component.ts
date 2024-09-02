import {Component, OnInit} from '@angular/core';
import {JournalEntry} from "../model/journal.model";
import {ApiResponse} from "../../util/api.response.model";
import {AccountingService} from "../accounting.service";
import {AlertService} from "../../util/alert.service";
import {AlertUtil} from "../../util/alert.util";

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent implements OnInit {

  journalEntries: JournalEntry[] = [];

  errors: { [key: string]: string } = {};

  constructor(
    private accountingService: AccountingService,
    private alertService: AlertService
  ) {
  }

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

}
