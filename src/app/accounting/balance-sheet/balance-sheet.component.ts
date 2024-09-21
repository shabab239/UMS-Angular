import { Component, OnInit } from '@angular/core';
import {AccountingService} from "../accounting.service";
import {BalanceSheet} from "../model/balance-sheet.model";
import {AlertService} from "../../util/alert.service";
import {AlertUtil} from "../../util/alert.util";

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent implements OnInit {
  balanceSheet: BalanceSheet = new BalanceSheet();
  totalDebit: number = 0;
  totalCredit: number = 0;

  constructor(
    private accountingService: AccountingService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.loadBalanceSheet();
  }

  loadBalanceSheet(): void {
    this.accountingService.getBalanceSheet().subscribe({
      next: (response) => {
        this.balanceSheet.leftSide = response.data['leftSide'];
        this.balanceSheet.rightSide = response.data['rightSide'];
        this.calculateTotals();
      },
      error: (error) => {
        AlertUtil.showError(error, this.alertService);
      }
    });
  }

  getRows() {
    const maxLength = Math.max(this.balanceSheet.leftSide.length, this.balanceSheet.rightSide.length);
    const rows = [];

    for (let i = 0; i < maxLength; i++) {
      rows.push({
        left: this.balanceSheet.leftSide[i] || null,
        right: this.balanceSheet.rightSide[i] || null
      });
    }
    return rows;
  }

  calculateTotals() {
    this.totalDebit = this.balanceSheet.leftSide.reduce((total, account) => total + account.balance, 0);
    this.totalCredit = this.balanceSheet.rightSide.reduce((total, account) => total - account.balance, 0);
  }

  isEqual(): boolean {
    return this.totalDebit === this.totalCredit;
  }
}
