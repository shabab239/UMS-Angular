import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {API_URLS} from "../config/urls";
import {ApiResponse} from "../util/api.response.model";
import {JournalEntry} from "./model/journal.model";

@Injectable({
  providedIn: 'root'
})
export class AccountingService {
  private apiUrl = API_URLS.accounting;

  constructor(private http: HttpClient) {}

  getJournal(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/getJournal`);
  }

  getBalanceSheet(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/getBalanceSheet`);
  }

}
